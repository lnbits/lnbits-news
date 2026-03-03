/**
 * One-time migration script: fetches all long-form articles (kind 30023)
 * from the configured Nostr relay and writes them as Markdown files into
 * data/posts/, preserving the URL slugs used by the previous Nostr-based site.
 *
 * Usage:
 *   node scripts/migrate-nostr.mjs
 *
 * Reads AUTHOR_PUBKEY and RELAY_URL from .env (or environment).
 */

import { Relay, useWebSocketImplementation } from 'nostr-tools/relay'
import { WebSocket } from 'ws'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

useWebSocketImplementation(WebSocket)

const __dirname = dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = join(__dirname, '..', 'data', 'posts')

const AUTHOR_PUBKEY = process.env.AUTHOR_PUBKEY
const RELAY_URL = process.env.RELAY_URL

if (!AUTHOR_PUBKEY || !RELAY_URL) {
  console.error('Missing AUTHOR_PUBKEY or RELAY_URL in environment / .env')
  process.exit(1)
}

// Mirrors slugifyForUri from utils.js to keep existing URLs intact.
function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function slugifyForUri(str) {
  let s = slugify(str).substring(0, 50)
  return s.replace(/-+$/, '')
}

function unixToISO(ts) {
  return new Date(Number(ts) * 1000).toISOString()
}

function filterDeletedArticles(articles, deletionRequests, authorPubkey) {
  if (!deletionRequests.length) return articles

  const deletedEventIds = new Set()
  const deletedAddresses = new Set()

  for (const del of deletionRequests) {
    if (del.pubkey !== authorPubkey) continue
    for (const tag of del.tags) {
      if (tag[0] === 'e') deletedEventIds.add(tag[1])
      else if (tag[0] === 'a') deletedAddresses.add(tag[1])
    }
  }

  return articles.filter((article) => {
    if (deletedEventIds.has(article.id)) return false
    const dTag = article.tags.find((t) => t[0] === 'd')
    if (dTag) {
      const address = `${article.kind}:${article.pubkey}:${dTag[1]}`
      if (deletedAddresses.has(address)) return false
    }
    return true
  })
}

function escapeYaml(str) {
  if (!str) return ''
  // Wrap in single quotes, escaping any existing single quotes.
  return "'" + str.replace(/'/g, "''") + "'"
}

async function fetchArticles() {
  console.log(`Connecting to ${RELAY_URL} …`)
  const relay = await Relay.connect(RELAY_URL)
  console.log('Connected.')

  return new Promise((resolve) => {
    const articles = []
    const deletionRequests = []
    let articlesComplete = false
    let deletionsComplete = false

    function tryResolve() {
      if (articlesComplete && deletionsComplete) {
        relay.close()
        resolve(filterDeletedArticles(articles, deletionRequests, AUTHOR_PUBKEY))
      }
    }

    const articleSub = relay.subscribe(
      [{ kinds: [30023], authors: [AUTHOR_PUBKEY] }],
      {
        onevent(event) {
          articles.push(event)
        },
        oneose() {
          articleSub.close()
          articlesComplete = true
          console.log(`Fetched ${articles.length} article event(s).`)
          tryResolve()
        },
      }
    )

    const deletionSub = relay.subscribe(
      [{ kinds: [5], authors: [AUTHOR_PUBKEY] }],
      {
        onevent(event) {
          deletionRequests.push(event)
        },
        oneose() {
          deletionSub.close()
          deletionsComplete = true
          console.log(`Fetched ${deletionRequests.length} deletion event(s).`)
          tryResolve()
        },
      }
    )

    setTimeout(() => {
      articleSub.close()
      deletionSub.close()
      relay.close()
      console.warn('Timeout reached — resolving with whatever was collected.')
      resolve(filterDeletedArticles(articles, deletionRequests, AUTHOR_PUBKEY))
    }, 30000)
  })
}

function buildMarkdown(event) {
  const tag = (name) => event.tags.find((t) => t[0] === name)?.[1] ?? ''

  const title = tag('title')
  const publishedAt = tag('published_at')
  const date = unixToISO(publishedAt || event.created_at)
  const summary = tag('summary')
  const image = tag('image')

  const lines = ['---', `title: ${escapeYaml(title)}`, `date: '${date}'`]
  if (summary) lines.push(`summary: ${escapeYaml(summary)}`)
  if (image) lines.push(`image: ${escapeYaml(image)}`)
  lines.push('draft: false')
  lines.push('---')
  lines.push('')
  lines.push(event.content)

  return lines.join('\n')
}

async function main() {
  if (!existsSync(POSTS_DIR)) {
    mkdirSync(POSTS_DIR, { recursive: true })
    console.log(`Created ${POSTS_DIR}`)
  }

  const articles = await fetchArticles()
  console.log(`\nMigrating ${articles.length} article(s) after filtering deletions…\n`)

  const usedFilenames = new Set()

  for (const event of articles) {
    const title = event.tags.find((t) => t[0] === 'title')?.[1]
    if (!title) {
      console.warn(`Skipping event ${event.id} — no title tag.`)
      continue
    }

    let filename = slugifyForUri(title)

    // Deduplicate filenames (shouldn't happen but be safe).
    if (usedFilenames.has(filename)) {
      filename = `${filename}-${event.id.slice(0, 6)}`
    }
    usedFilenames.add(filename)

    const filepath = join(POSTS_DIR, `${filename}.md`)
    const content = buildMarkdown(event)
    writeFileSync(filepath, content, 'utf8')
    console.log(`  ✓ ${filename}.md`)
  }

  console.log('\nMigration complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

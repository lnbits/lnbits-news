import { kv } from '@vercel/kv'
const { useWebSocketImplementation } = require('nostr-tools/relay')
const { Relay } = require('nostr-tools/relay')
import dotenv from 'dotenv'

dotenv.config()

const { WebSocket } = require('ws')

/* eslint-disable react-hooks/rules-of-hooks */
useWebSocketImplementation(WebSocket)
/* eslint-enable react-hooks/rules-of-hooks */

/**
 * Converts a Unix timestamp to a human-readable date string.
 * @param {number} timestamp - The Unix timestamp to convert.
 * @returns {string} - The formatted date string.
 */
function unixTimestampToDate(timestamp) {
  const date = new Date(timestamp * 1000) // Convert to milliseconds
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export { unixTimestampToDate }

const CACHE_TTL = 10 * 60 * 1000 // 10 minutes in milliseconds

export async function getOrSetCache(key, fetchData) {
  const cachedData = await kv.get(key)
  const now = Date.now()

  if (process.env.NOSTR_REDIS_CACHE_ENABLED && cachedData && cachedData.expiry > now) {
    console.log('Cache exists and has not expired returning', key)
    return cachedData.value
  } else {
    const formattedExpiry = new Date(cachedData && cachedData.expiry).toLocaleString()
    console.log('formattedExpiry: ', formattedExpiry)
    // log why we are fetching new data
    if (cachedData) {
      console.log('Cache has expired for key:', key)
    } else {
      console.log('No cache found for key:', key)
    }
    console.log('Fetching new data for key:', key)
    const newData = await fetchData()
    const expiry = now + CACHE_TTL
    console.log('expiry: ', expiry)

    await kv.set(key, { value: newData, expiry })
    console.log('Set key:', key, 'with expiry:', expiry, 'formattedExpiry:', formattedExpiry)

    return newData
  }
}

export async function getArticlesByAuthor(authorNpubHex, relayUrl) {
  try {
    const relay = await Relay.connect(relayUrl)

    return new Promise((resolve, reject) => {
      const events = []
      const sub = relay.subscribe(
        [
          {
            kinds: [30023],
            authors: [authorNpubHex],
          },
        ],
        {
          onevent(event) {
            events.push(event)
          },
          oneose() {
            sub.close()
            relay.close()
            resolve(events)
          },
        }
      )

      // Timeout after 30 seconds
      setTimeout(() => {
        sub.close()
        relay.close()
        resolve(events) // Resolve with whatever events have been collected so far
      }, 30000)
    })
  } catch (error) {
    console.error('Error connecting to relay:', error)
    return []
  }
}

export async function getCachedArticles(authorNpubHex, relayUrl) {
  return await getOrSetCache('lnbits-news-articles', async () => {
    return await getArticlesByAuthor(authorNpubHex, relayUrl)
  })
}

export async function getUserProfile(authorNpubHex, relayUrl) {
  try {
    const relay = await Relay.connect(relayUrl)

    return new Promise((resolve, reject) => {
      let profile = {}
      const sub = relay.subscribe(
        [
          {
            kinds: [0],
            authors: [authorNpubHex],
            limit: 1,
          },
        ],
        {
          onevent(event) {
            profile = event
          },
          oneose() {
            sub.close()
            relay.close()
            resolve(JSON.parse(profile.content))
          },
        }
      )

      // Timeout after 30 seconds
      setTimeout(() => {
        sub.close()
        relay.close()
        resolve(profile) // Resolve with whatever events have been collected so far
      }, 30000)
    })
  } catch (error) {
    console.error('Error connecting to relay:', error)
    return []
  }
}

export async function getCachedUserProfile(authorNpubHex, relayUrl) {
  return await getOrSetCache('lnbits-user-profile', async () => {
    return await getUserProfile(authorNpubHex, relayUrl)
  })
}

// export a function to slugify a string to be used in URIs
export function slugify(string) {
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export function slugifyForUri(string) {
  let slug = slugify(string).substring(0, 50)
  slug = slug.replace(/-+$/, '')
  return slug
}

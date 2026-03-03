import { writeFileSync } from 'fs'
import { createRequire } from 'module'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'

// Import directly from the generated JSON to avoid the contentlayer2 index.mjs
// which uses `assert { type: 'json' }` syntax incompatible with Node 22.
const require = createRequire(import.meta.url)
const allPosts = require('../.contentlayer/generated/Post/_index.json')

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/news/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/news/${post.slug}</link>
    ${post.summary ? `<description>${escape(post.summary)}</description>` : ''}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.author}</author>
  </item>
`

const generateRss = (config, posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/news</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`

async function generateRSS(config, posts) {
  const publishPosts = posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (publishPosts.length > 0) {
    const rss = generateRss(config, publishPosts)
    writeFileSync('./public/feed.xml', rss)
    console.log('RSS feed generated...')
  }
}

const rss = () => {
  return generateRSS(siteMetadata, allPosts)
}

export default rss

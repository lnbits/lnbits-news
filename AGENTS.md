# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev       # Start dev server (http://localhost:3000)
yarn build     # Build for production
yarn serve     # Start production server
yarn lint      # Run ESLint with auto-fix
yarn analyze   # Build with bundle analyzer
```

No test suite is configured.

## Architecture

This is a **Next.js 14 App Router** news site for LNbits, built on top of the [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) template.

### Content Flow

Articles are Markdown files in `data/posts/`. [Contentlayer2](https://github.com/timlrx/contentlayer2) processes them at build time into typed objects available as `allPosts` from `contentlayer/generated`. Pages are statically generated.

```
data/posts/*.md  (Markdown with YAML frontmatter)
       ↓
contentlayer.config.ts  (Post document type, contentType: 'markdown')
       ↓
.contentlayer/generated/  (generated at build time)
       ↓
app/Main.tsx         — listing, 9/page, sorted by date desc
app/news/[...slug]/  — static article pages (slug = filename without .md)
```

### Adding a New Article

Create a file in `data/posts/` with the filename becoming the URL slug:

```markdown
---
title: 'My Article Title'
date: '2024-06-01T12:00:00.000Z'
summary: 'Optional excerpt shown on the listing page.'
image: 'https://...' # optional banner image
draft: false
---

Article body in Markdown...
```

Then commit, push, and redeploy. Slug = filename without `.md` (e.g. `my-article.md` → `/news/my-article`).

### Key Files

- **`data/posts/`** — all news article Markdown files
- **`contentlayer.config.ts`** — defines the `Post` document type; `Blog` and `Authors` types are also present (template leftovers, harmless)
- **`app/Main.tsx`** — homepage news grid with pagination
- **`app/news/[...slug]/page.tsx`** — static article pages with `generateStaticParams`; renders `post.body.raw` via ReactMarkdown
- **`data/siteMetadata.js`** — site-wide config (title, URLs, analytics, comments, search)
- **`scripts/rss.mjs`** — generates `public/feed.xml` during postbuild; reads posts directly from `.contentlayer/generated/Post/_index.json` (not through `index.mjs`, which has a Node 22 incompatibility)
- **`scripts/migrate-nostr.mjs`** — one-time script used to migrate content from Nostr; kept for reference

### next.config.js

Uses `withContentlayer` from `next-contentlayer2` (must be first in the plugins array) to wire up the `contentlayer/generated` module alias and watch for file changes in dev.

### Known Warnings

- `<img>` element warnings from Next.js linter — intentional, article images are external URLs unsuitable for `next/image` optimisation
- `⚠ TypeScript project references are not fully supported` — cosmetic, does not affect the build

## Environment Variables

No required environment variables for the core site. Optional:

```bash
NEXT_UMAMI_ID=                       # Umami analytics website ID
NEXT_PUBLIC_GISCUS_REPO=             # Giscus comments (see giscus.app)
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

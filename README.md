# LNbits News

News site for LNbits releases, features, and events. Built with [Next.js 14](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Contentlayer2](https://github.com/timlrx/contentlayer2).

Articles are Markdown files in `data/posts/`. Publishing a new article is a git commit.

## Development

```bash
yarn          # install dependencies
yarn dev      # start dev server at http://localhost:3000
yarn build    # production build
yarn lint     # lint and auto-fix
```

## Publishing an Article

Create a new file in `data/posts/`. The filename (without `.md`) becomes the URL slug.

```
data/posts/lnbits-v1-1-0.md  →  https://news.lnbits.com/news/lnbits-v1-1-0
```

**Frontmatter fields:**

```markdown
---
title: "LNbits v1.1.0 Released" # required
date: "2024-06-01T12:00:00.000Z" # required — ISO 8601, used for sorting
summary: "What changed in this release" # optional — shown on the listing card
image: "https://..." # optional — banner image
draft: false # set to true to hide from the site
---

Article body in Markdown. Standard GitHub Flavored Markdown is supported,
including tables, strikethrough, and fenced code blocks.

Raw HTML is also allowed — including <iframe> and <video> embeds.
```

After writing the file, commit and push. Vercel will automatically redeploy.

## Site Configuration

Edit `data/siteMetadata.js` to update:

- Site title, description, and URL
- Social links (GitHub, X, YouTube, Nostr)
- Analytics (Umami — set `NEXT_UMAMI_ID` in environment)
- Comments (Giscus — set the `NEXT_PUBLIC_GISCUS_*` vars in environment)

## Deployment

### Vercel (recommended)

1. Import this repository in the [Vercel dashboard](https://vercel.com/new)
2. No build configuration needed — Vercel detects Next.js automatically
3. Optional environment variables (see `data/siteMetadata.js` for which features they enable):

```
NEXT_UMAMI_ID
NEXT_PUBLIC_GISCUS_REPO
NEXT_PUBLIC_GISCUS_REPOSITORY_ID
NEXT_PUBLIC_GISCUS_CATEGORY
NEXT_PUBLIC_GISCUS_CATEGORY_ID
```

A `pages.yml` GitHub Actions workflow is included for GitHub Pages deployment — select **GitHub Actions** under `Settings > Pages > Build and deployment > Source`.

### Static export (S3, Cloudflare Pages, etc.)

```bash
EXPORT=1 UNOPTIMIZED=1 yarn build
```

Deploy the generated `out/` directory. Note that the RSS feed at `/feed.xml` and any server-side features (newsletter API) will not work in a static export.

import 'css/prism.css'
import 'katex/dist/katex.css'
import Head from 'next/head'
import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import {
  getCachedArticles,
  getCachedUserProfile,
  slugifyForUri,
  unixTimestampToDate,
} from '../../../utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeFormat from 'rehype-format'
import type { Root, Element, RootContent } from 'hast'

// Custom rehype plugin to convert <br> to <br />
const rehypeSelfClosingBr = () => {
  return (tree: Root) => {
    const visit = (node: Root | RootContent) => {
      if (node.type === 'element') {
        if (node.tagName === 'br') {
          node.properties = node.properties || {}
          node.children = []
        }
        node.children.forEach(visit)
      } else if ('children' in node) {
        ;(node as Root).children.forEach(visit)
      }
    }
    visit(tree)
  }
}

const defaultLayout = 'PostLayout'

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const posts = await getCachedArticles(process.env.AUTHOR_PUBKEY, process.env.RELAY_URL)
  const post = posts.find((article) => {
    const slugifiedTitle = slugifyForUri(article.tags.find((tag) => tag[0] === 'title')[1])
    return slugifiedTitle === slug
  })

  if (!post) {
    return
  }

  const publishedAt = new Date(unixTimestampToDate(post.created_at)).toISOString()
  // const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  const postTitle = post.tags.find((tag) => tag[0] === 'title')?.[1] || ''
  const ogImage = post.tags.find((tag) => tag[0] === 'image')?.[1] || ''
  const summary = post.tags.find((tag) => tag[0] === 'summary')?.[1] || ''

  return {
    title: postTitle,
    description: summary,
    openGraph: {
      title: postTitle ?? post.title,
      description: summary ?? post.summary,
      siteName: siteMetadata.title,
      locale: 'en_GB',
      type: 'article',
      publishedTime: publishedAt,
      url: './',
      images: ogImage ?? ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: postTitle ?? post.title,
      description: summary ?? post.summary,
      images: ogImage ?? ogImages,
    },
  }
}

// Extend the default schema to allow iframe and video
const customSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'iframe', 'video', 'source'],
  attributes: {
    ...defaultSchema.attributes,
    iframe: [
      'src',
      'width',
      'height',
      'allow',
      'allowfullscreen',
      'frameborder',
      'loading',
      'referrerpolicy',
      'sandbox',
      'title',
    ],
    video: ['src', 'width', 'height', 'controls', 'autoplay', 'loop', 'muted', 'poster', 'preload'],
    source: ['src', 'type'],
  },
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const posts = await getCachedArticles(process.env.AUTHOR_PUBKEY, process.env.RELAY_URL)
  const post = posts.find((article) => {
    const slugifiedTitle = slugifyForUri(article.tags.find((tag) => tag[0] === 'title')[1])
    return slugifiedTitle === slug
  })
  console.log('Fetched post:', post.content)
  const postTitle = post.tags.find((tag) => tag[0] === 'title')?.[1] || ''
  const author = await getCachedUserProfile(process.env.AUTHOR_PUBKEY, process.env.RELAY_URL)
  const image =
    post.tags.find((tag) => tag[0] === 'image') && post.tags.find((tag) => tag[0] === 'image')[1]

  const Layout = defaultLayout

  return (
    <>
      <div>
        <header className="pb-6 pt-6 xl:pb-6">
          <div className="space-y-1 text-center">
            <dl className="space-y-10">
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time>{unixTimestampToDate(post.created_at)}</time>
                </dd>
              </div>
            </dl>
            <div>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                {postTitle}
              </h1>
            </div>
          </div>
        </header>
        <div
          className={
            'grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0'
          }
        >
          <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
            <dt className="sr-only">Authors</dt>
            <dd>
              <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                <li className="flex items-center space-x-2">
                  <img
                    alt="avatar"
                    loading="lazy"
                    width="38"
                    src={author.picture}
                    height="38"
                    decoding="async"
                    data-nimg="1"
                    className="h-10 w-10 rounded-full"
                    style={{ color: 'transparent' }}
                  />
                  <dl className="whitespace-nowrap text-sm font-medium leading-5">
                    <dt className="sr-only">Name</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                  </dl>
                </li>
              </ul>
            </dd>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y"></div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={'/'}
                  className={'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'}
                >
                  ← Back to the news
                </Link>
              </div>
            </footer>
          </dl>
          <main className={'prose dark:prose-invert xl:col-span-3 xl:row-span-2 xl:pb-0'}>
            {image && <img src={image} alt={postTitle} className="mb-4 w-full" />}
            <ReactMarkdown
              rehypePlugins={[
                rehypeRaw,
                [rehypeSanitize, customSchema],
                rehypeSelfClosingBr,
                [rehypeFormat, { indent: 2 }],
              ]}
              remarkPlugins={[remarkGfm]}
            >
              {post.content}
            </ReactMarkdown>
          </main>
        </div>
      </div>
    </>
  )
}

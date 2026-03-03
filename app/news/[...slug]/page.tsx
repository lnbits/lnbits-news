import 'css/prism.css'
import 'katex/dist/katex.css'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeFormat from 'rehype-format'
import type { Root, RootContent } from 'hast'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

// Custom rehype plugin to make <br> self-closing for JSX compatibility.
const rehypeSelfClosingBr = () => (tree: Root) => {
  const visit = (node: Root | RootContent) => {
    if (node.type === 'element' && node.tagName === 'br') {
      node.properties = node.properties || {}
      node.children = []
    }
    if ('children' in node) {
      node.children.forEach(visit)
    }
  }
  visit(tree)
}

// Allow iframe, video and source tags in addition to the default safe set.
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

export async function generateStaticParams() {
  return allPosts.filter((post) => !post.draft).map((post) => ({ slug: [post.slug] }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) return undefined

  const ogImages = post.image
    ? [{ url: post.image.startsWith('http') ? post.image : siteMetadata.siteUrl + post.image }]
    : [{ url: siteMetadata.siteUrl + siteMetadata.socialBanner }]

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_GB',
      type: 'article',
      publishedTime: post.date,
      url: './',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: ogImages,
    },
  }
}

export default function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const post = allPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <div>
      <header className="pb-6 pt-6 xl:pb-6">
        <div className="space-y-1 text-center">
          <dl className="space-y-10">
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={post.date}>{formatDate(post.date, siteMetadata.locale)}</time>
              </dd>
            </div>
          </dl>
          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {post.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
        <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
          <dt className="sr-only">Author</dt>
          <dd>
            <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
              <li className="flex items-center space-x-2">
                <img
                  alt="LNbits"
                  src={`${process.env.BASE_PATH || ''}/static/images/logo.jpg`}
                  width="38"
                  height="38"
                  className="h-10 w-10 rounded-full"
                />
                <dl className="whitespace-nowrap text-sm font-medium leading-5">
                  <dt className="sr-only">Name</dt>
                  <dd className="text-gray-900 dark:text-gray-100">{siteMetadata.author}</dd>
                </dl>
              </li>
            </ul>
          </dd>
          <footer>
            <div className="pt-4 xl:pt-8">
              <Link
                href="/"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                ← Back to the news
              </Link>
            </div>
          </footer>
        </dl>

        <main className="prose dark:prose-invert xl:col-span-3 xl:row-span-2 xl:pb-0">
          {post.image && <img src={post.image} alt={post.title} className="mb-4 w-full" />}
          <ReactMarkdown
            rehypePlugins={[
              rehypeRaw,
              [rehypeSanitize, customSchema],
              rehypeSelfClosingBr,
              [rehypeFormat, { indent: 2 }],
            ]}
            remarkPlugins={[remarkGfm]}
          >
            {post.body.raw}
          </ReactMarkdown>
        </main>
      </div>
    </div>
  )
}

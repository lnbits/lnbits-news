import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { getCachedArticles, slugifyForUri, unixTimestampToDate } from '../utils'
import dotenv from 'dotenv'

dotenv.config()

const ITEMS_PER_PAGE = 9

// Make the page dynamic
export const dynamic = 'force-dynamic'

interface MainProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Main({ searchParams }: MainProps) {
  const posts = await getCachedArticles(process.env.AUTHOR_PUBKEY, process.env.RELAY_URL)
  // sort posts by title tag
  posts.sort((a, b) => {
    const aArticleDate = a.tags.find((tag) => tag[0] === 'published_at')?.[1]
    const bArticleDate = b.tags.find((tag) => tag[0] === 'published_at')?.[1]

    return parseInt(bArticleDate) - parseInt(aArticleDate)
  })
  // log title of each posts
  posts.forEach((post) => {
    const title = post.tags.find((tag) => tag[0] === 'title')?.[1]
    const date = post.tags.find((tag) => tag[0] === 'published_at')?.[1]
    console.log('title: ', title, unixTimestampToDate(date))
  })
  console.log('Total posts:', posts.length)
  console.log('Search params:', searchParams)

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE)
  console.log('Total pages:', totalPages)

  // Ensure page is between 1 and totalPages
  const pageParam = searchParams?.page
  let currentPage = 1
  if (typeof pageParam === 'string') {
    currentPage = Number(pageParam)
  }
  currentPage = Math.max(1, Math.min(currentPage, totalPages))
  console.log('Current page:', currentPage)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, posts.length)
  console.log('Start index:', startIndex)
  console.log('End index:', endIndex)

  const currentPosts = posts.slice(startIndex, endIndex)
  console.log('Current posts length:', currentPosts.length)
  console.log('First post title:', currentPosts[0]?.tags.find((tag) => tag[0] === 'title')?.[1])

  return (
    <>
      <div>
        <div className="prose space-y-2 pb-8 pt-6 dark:prose-invert md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            LNbits News
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            News about LNbits releases, new features, upcoming events and product releases.
          </p>
          <p>
            New posts are published as Nostr long form content and can be read in any&nbsp;
            <a
              href={
                'https://highlighter.com/npub10efcj7x65z2ak6vd69xr8f2hvqwuaqrhlygl3yqa4y63hfvc02mqwzaeh3'
              }
              title={'LNbits News on Highlighter.com'}
            >
              long form
            </a>
            &nbsp;
            <a
              href={
                'https://habla.news/p/npub10efcj7x65z2ak6vd69xr8f2hvqwuaqrhlygl3yqa4y63hfvc02mqwzaeh3'
              }
              title={'LNbits News on Habla.news'}
            >
              Nostr
            </a>
            &nbsp;
            <a
              href={
                'https://yakihonne.com/users/nprofile1qyw8wumn8ghj7mn0wd68ytfsxyh8jcttd95x7mnwv5hxxmmdqyw8wumn8ghj7mn0wd68ytfsxgh8jcttd95x7mnwv5hxxmmdqy08wumn8ghj7mn0wd68ytfsxvhxgmmjv9nxzcm5dae8jtn0wfnsz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcpremhxue69uhkummnw3ez6vpj9ejx7unpveskxar0wfujummjvuqzqljn39ud4gy4md5cm52vxwj4wcqae6q807g3lzgpm2f4rwjes74k92pvhf'
              }
              title={'LNbits News on Yakihonne.com'}
            >
              client
            </a>
            .
          </p>
          <p>
            Find us on nostr:
            <a href={'https://njump.me/lnbits@nostr.com'} title={'LNbits on Nostr'}>
              lnbits@nostr.com
            </a>
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {!currentPosts.length && 'No posts found.'}
          {currentPosts.map((post) => {
            const { summary } = post
            const image =
              post.tags.find((tag) => tag[0] === 'image') &&
              post.tags.find((tag) => tag[0] === 'image')[1]
            const title = post.tags.find((tag) => tag[0] === 'title')[1]
            const slug = slugifyForUri(title)
            const date = formatDate(unixTimestampToDate(post.created_at))
            return (
              <article
                key={slug}
                className="flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
              >
                {image && (
                  <div className="aspect-w-16 aspect-h-9">
                    <img src={image} alt={title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </p>
                    <h2 className="mt-2 text-xl font-semibold leading-7 tracking-tight text-gray-900 dark:text-gray-100">
                      <Link href={`/news/${slug}`} className="hover:text-primary-500">
                        {title}
                      </Link>
                    </h2>
                    <p className="mt-3 line-clamp-3 text-base leading-7 text-gray-500 dark:text-gray-400">
                      {summary}
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/news/${slug}`}
                      className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Read more: "${title}"`}
                    >
                      Read more &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-4 pb-8 pt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/?page=${page}`}
              className={`rounded-md px-4 py-2 ${
                page === currentPage
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

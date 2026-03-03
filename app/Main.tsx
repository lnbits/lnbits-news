import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { allPosts } from 'contentlayer/generated'

const ITEMS_PER_PAGE = 9

interface MainProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Main({ searchParams }: MainProps) {
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE)

  const pageParam = searchParams?.page
  let currentPage = 1
  if (typeof pageParam === 'string') {
    currentPage = Number(pageParam)
  }
  currentPage = Math.max(1, Math.min(currentPage, totalPages))

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentPosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {!currentPosts.length && 'No posts found.'}
          {currentPosts.map((post) => {
            const { title, slug, date, summary, image } = post
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
                    {summary && (
                      <p className="mt-3 line-clamp-3 text-base leading-7 text-gray-500 dark:text-gray-400">
                        {summary}
                      </p>
                    )}
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

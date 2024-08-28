import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { getCachedArticles, slugifyForUri, unixTimestampToDate } from '../utils'
import dotenv from 'dotenv'

dotenv.config()

const MAX_DISPLAY = 500

export default async function Home() {
  const posts = await getCachedArticles(process.env.AUTHOR_PUBKEY, process.env.RELAY_URL)
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
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
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { summary } = post
            const image =
              post.tags.find((tag) => tag[0] === 'image') &&
              post.tags.find((tag) => tag[0] === 'image')[1]
            const title = post.tags.find((tag) => tag[0] === 'title')[1]
            const slug = slugifyForUri(title)
            const date = formatDate(unixTimestampToDate(post.created_at))
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/news/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/news/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
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

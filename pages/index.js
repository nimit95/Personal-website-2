import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Image from '@/components/Image'
import NewsletterForm from '@/components/NewsletterForm'
import SocialIcon from '@/components/social-icons'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-300 dark:divide-gray-700">
        <div className="flex flex-row flex-wrap items-center justify-center">
          <div className="mb-5 flex flex-col items-center justify-center">
            <Image
              src={siteMetadata.image}
              alt="avatar"
              width="250px"
              height="250px"
              className="shrink rounded-full object-cover"
            />
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="github" href={siteMetadata.github} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
              <SocialIcon kind="twitter" href={siteMetadata.twitter} />
            </div>
          </div>
          <div className="md: prose ml-5 max-w-sm flex-col py-8 dark:prose-dark">
            <h2 className="mb-2 text-xl font-extrabold">Hey, I am Nimit 👋</h2>
            <p>
              I am software Enigneer at Meta. Love to tinker with the code to make something new and
              exciting. I mostly spend my time either watching youtube or reading something
              interesting. Occasionally, I go out and visit new places and click some{' '}
              <Link href="https://instagram.com/better_jpeg">pictures</Link>. My{' '}
              <a href="https://twitter.com/nimit95">DMs</a> are always open.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-2">
          <div className="prose text-xl font-semibold text-gray-800 dark:text-gray-100">
            Subscribe to the newsletter
          </div>
          <div className="flex w-full items-center justify-center">
            <iframe
              src="https://nimitagg.substack.com/embed"
              frameorder="0"
              scrolling="no"
              className="bg-white dark:bg-inherit"
            ></iframe>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-2">
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Companies I have worked for
          </div>
          <div className="grid w-full grid-cols-3 items-center justify-center gap-10 p-6">
            <Image
              src="/static/images/Meta_Platforms_Inc._logo.svg.png"
              alt="avatar"
              width="100px"
              height="50px"
              className=""
            />{' '}
            <Image
              src="/static/images/browserstack-logo-600x315.png"
              alt="avatar"
              width="80px"
              height="70px"
              className=""
            />
            <Image
              src="/static/images/medianet.png"
              alt="avatar"
              width="100px"
              height="30px"
              className=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-2">
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-100">Blog</div>
          <ul className="divide-gray-250 divide-y dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <li key={slug} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read "${title}"`}
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
          <Link
            href="/blog/"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="read all"
          >
            Read All &rarr;
          </Link>
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}

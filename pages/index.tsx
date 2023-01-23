import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { getAllArticles } from '../lib/mdx'

export async function getStaticProps() {
  const articles = await getAllArticles()

  articles
    .map((article) => article.data)
    .sort((a, b) => {
      if (a.data.publishedAt > b.data.publishedAt) return 1
      if (a.data.publishedAt < b.data.publishedAt) return -1

      return 0
    })

  return {
    props: {
      posts: articles,
    },
  }
}


export default function Home({
  posts
}: {
  posts: {
    date: string
    title: string
    id: string,
    slug: string,
    tags: string[]
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Frontend Engineer {" "}
          <Link
            className="text-blue-500 hover:text-blue-800"
            href="https://www.typedream.com"
          >
            @Typedream
          </Link>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, date, title, slug, tags }) => (
            <li className={utilStyles.listItem} key={id}>
              <h4>
                <Link href={`/posts/${slug}`}>{title}</Link>
              </h4>
              <div>{tags?.map((t) => <span key={t}>{t}</span>)}</div>
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { getAllArticles } from '../lib/mdx'
import { Tag } from '../components/Tag/Tag'

export async function getStaticProps() {
  const articles = await getAllArticles()
  console.log("article", articles)

  articles
    .sort((a, b) => {
      if (a.publishedAt > b.publishedAt) return -1
      if (a.publishedAt < b.publishedAt) return 1

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
              <div style={{ display: 'flex', flexDirection: 'row' }}>{tags?.map((t) => <><Tag key={t}>{t}</Tag><div style={{ width: '5px' }} /></>)}</div>
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

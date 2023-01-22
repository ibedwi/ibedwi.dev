import Head from "next/head"
import Link from "next/link"
import { getAllArticles, getSlug } from "../../lib/mdx"
import dayjs from 'dayjs'


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
      posts: articles.reverse(),
    },
  }
}

// export async function getStaticPaths() {
//   // getting all paths of each article as an array of
//   // objects with their unique slugs
//   const paths = (await getSlug()).map((slug) => ({ params: { slug } }))

//   return {
//     paths,
//     // in situations where you try to access a path
//     // that does not exist. it'll return a 404 page
//     fallback: false,
//   }
// }

export default function BlogPage({ posts }) {
  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <div>
        {posts.map((frontMatter) => {


          return (
            <Link href={`/writings/${frontMatter.slug}`} passHref>
              <div>
                <h1 className="title">{frontMatter.title}</h1>
                <p className="summary">{frontMatter.excerpt}</p>
                <p className="date">
                  {dayjs(frontMatter.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
                  {frontMatter.readingTime}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
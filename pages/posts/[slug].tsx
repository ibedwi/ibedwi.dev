import { getArticleFromSlug, getSlug } from "../../lib/mdx"
import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight';
import Head from "next/head";
import dayjs from 'dayjs'
import { MDXRemote } from 'next-mdx-remote'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import utilStyles from '../../styles/utils.module.css';
import Layout from "../../components/Layout/layout";
import 'highlight.js/styles/atom-one-dark-reasonable.css'
export async function getStaticProps({ params }) {
  //fetch the particular file based on the slug
  const { slug } = params
  const { content, frontmatter } = await getArticleFromSlug(slug)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: { className: ['anchor'] },
          },
          { behaviour: 'wrap' },
        ],
        rehypeHighlight,
        // rehypeCodeTitles,
      ],
    },
  })

  return {
    props: {
      post: {
        source: mdxSource,
        frontmatter,
      },
    },
  }
}

export async function getStaticPaths() {
  // getting all paths of each article as an array of
  // objects with their unique slugs
  const paths = (await getSlug()).map((slug) => ({ params: { slug } }))

  return {
    paths,
    // in situations where you try to access a path
    // that does not exist. it'll return a 404 page
    fallback: false,
  }
}

export default function Blog({ post: { source, frontmatter } }) {
  return (
    <>
      <Layout>
        <Head>
          <title>{frontmatter.title} | My blog</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{frontmatter.title}</h1>
          <div className={utilStyles.lightText}>
            {/* <Date dateString={postData.date} /> */}
            <div> {dayjs(frontmatter.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}    {frontmatter.readingTime}</div>
          </div>
          {/* <pre>{JSON.stringify(source, undefined, 2)}</pre> */}
          <MDXRemote {...source} />
        </article>
      </Layout>
    </>
  )
}
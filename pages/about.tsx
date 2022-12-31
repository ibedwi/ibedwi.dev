import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from '../styles/utils.module.css'

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>About</h1>
      </article>
    </Layout>
  )
}

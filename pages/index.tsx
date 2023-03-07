import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Blog App</title>
        <meta name="description" content="Blog App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold">
        Blog App
      </h1>
      <Link href={'/blogs'} className="underline hover:text-red-500">Click here to Blog page</Link>
    </div>
  )
}

export default Home

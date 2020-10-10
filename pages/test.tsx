import Head from 'next/head'
import Link from 'next/link'

export default function Test() {
  return (
    <div className='container'>
      <Head>
        <title>Test</title>
      </Head>
      <main className='main'>
        <h1>
          Test
        </h1>

        <Link href='/'><a>Home</a></Link>
      </main>
    </div>
  )
}

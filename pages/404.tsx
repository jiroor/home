import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className='container'>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <main className='main'>
        <h1>
          404 - Page Not Found
        </h1>

        <Link href='/'><a>Home</a></Link>
      </main>
    </div>
  )
}

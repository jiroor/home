import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>jiroor</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.section}>
          <h1 className={styles.heading1}>
            jiroor
          </h1>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading2}>
            Profile
          </h2>
          <div>
            安田善樹
            やすだよしき
            よしお・じろー
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading2}>
            Career
          </h2>
          <div>
            Webフロントエンジニア

            2013年5月 天空のクリスタリア
            2015年5月 スクールファンファーレ
            2016年10月 BF
            2018年10月 mogg
            2019年10月 OPENREC.tv
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading2}>
            Skill
          </h2>
          <div>
            HTML, CSS, JavaScript
            SCSS, PostCSS
            TypeScript
            React, Vue.js, AngularJS
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading2}>
            Tools
          </h2>
          <div>
            <Link href='/recognition'>
              Recognition
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

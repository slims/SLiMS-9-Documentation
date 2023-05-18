import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">SLiMS Documentation</h1>
        <p className="hero__subtitle">What is your role?</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/user-guide/about" title="librarian or end user">
            User
          </Link>&nbsp;
          <Link className="button button--secondary button--lg" to="/development-guide/about" title="Developer, Plugin Maker, System Admin etc">
            Developer
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={`Welcome to SLiMS Documentation`}description="SLiMS Documentation such as APi, User Guide, How To, Development guide, Code documentation etc">
      <Head>
        <meta property="keywords" content="SLiMS Documentation, SLiMS Doc"/>
        <meta property="og:image" content="https://slims.web.id/web/site/assets/files/1023/slims9small.png"/>
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

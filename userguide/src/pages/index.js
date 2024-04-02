import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LayoutProvider from '@theme/Layout/Provider';
import Head from '@docusaurus/Head';
import Footer from '@theme/Footer';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <section>
      <header className={clsx('hero', styles.heroBanner)}>
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
      <Footer/>
    </section>
  );
}

export default function Home() {
  return (
    <LayoutProvider>
      <Head>
        <meta property="keywords" content="SLiMS Documentation, SLiMS Doc"/>
        <meta property="og:image" content="https://slims.web.id/web/site/assets/files/1023/slims9small.png"/>
      </Head>
      <HomepageHeader />
    </LayoutProvider>
  );
}

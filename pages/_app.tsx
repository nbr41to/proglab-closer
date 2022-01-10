import '../src/assets/styles/reset.css';
import '../src/assets/styles/global.css';

import Head from 'next/head';
import { RecoilRoot } from 'recoil';

import { Layout } from '@/components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        <Head>
          <title>progLab-closer</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;

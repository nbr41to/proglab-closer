import '../src/assets/styles/reset.css';
import '../src/assets/styles/global.css';

import { RecoilRoot } from 'recoil';
import { Layout } from 'src/components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;

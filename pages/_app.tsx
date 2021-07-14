import { AuthProvider } from '../src/context/Auth';
import '../src/assets/reset.css';
import { RecoilRoot } from 'recoil';
import { Layout } from '../src/components/Layout';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <RecoilRoot>
        {process.browser && location.pathname === '/' ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </RecoilRoot>
    </AuthProvider>
  );
}

export default MyApp;

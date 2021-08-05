import { AuthProvider } from '../src/context/Auth';
import '../src/assets/reset.css';
import '../src/assets/global.css';
import { RecoilRoot } from 'recoil';
import { Layout } from '../src/components/Layout';
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AuthProvider>
        {process.browser && location.pathname === '/login' ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;

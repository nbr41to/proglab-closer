import { AuthProvider } from '../src/context/Auth';
import '../src/assets/reset.css';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

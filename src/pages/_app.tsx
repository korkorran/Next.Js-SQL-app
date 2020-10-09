import '../scss/styles.scss';
import Head from 'next/head';
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import { AuthProvider } from '../contexts/auth'

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Next.Js SQL app</title>
      </Head>
      <NavBar></NavBar>
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  );
}


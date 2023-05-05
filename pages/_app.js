import '@/styles/globals.css'
import Layout from '../components/Layout'
import 'flowbite'
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps} }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )

}

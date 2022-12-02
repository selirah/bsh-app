import type { AppProps } from 'next/app'
import { LanguageContextProvider, ThemeContextProvider, LayoutContextProvider } from '../contexts'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import '../styles/globals.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <LayoutContextProvider>
      <LanguageContextProvider>
        <ThemeContextProvider>
          <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            </QueryClientProvider>
          </SessionProvider>
          <ToastContainer newestOnTop />
        </ThemeContextProvider>
      </LanguageContextProvider>
    </LayoutContextProvider>
  )
}

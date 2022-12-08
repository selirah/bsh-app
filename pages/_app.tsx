import type { AppProps } from 'next/app'
import {
  LanguageContextProvider,
  ThemeContextProvider,
  LayoutContextProvider,
  AbilityContext
} from '../contexts'
import { ErrorBoundary } from 'components'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ability from 'utils/ability'
import '../styles/globals.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <LayoutContextProvider>
      <LanguageContextProvider>
        <ThemeContextProvider>
          <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
              <ErrorBoundary>
                <AbilityContext.Provider value={ability}>
                  <Component {...pageProps} />
                </AbilityContext.Provider>
              </ErrorBoundary>
              <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            </QueryClientProvider>
          </SessionProvider>
          <ToastContainer newestOnTop />
        </ThemeContextProvider>
      </LanguageContextProvider>
    </LayoutContextProvider>
  )
}

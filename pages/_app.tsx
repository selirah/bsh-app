import type { AppProps } from 'next/app'
import { LanguageContextProvider, ThemeContextProvider, LayoutContextProvider } from '../contexts'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider, QueryClient } from 'react-query'
import '../styles/globals.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutContextProvider>
      <LanguageContextProvider>
        <ThemeContextProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
          <ToastContainer newestOnTop />
        </ThemeContextProvider>
      </LanguageContextProvider>
    </LayoutContextProvider>
  )
}

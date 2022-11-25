import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LanguageContextProvider } from '../contexts/i18n'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageContextProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <ToastContainer newestOnTop />
    </LanguageContextProvider>
  )
}

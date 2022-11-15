import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LanguageContextProvider } from '../contexts/i18n'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageContextProvider>
      <Component {...pageProps} />
    </LanguageContextProvider>
  )
}

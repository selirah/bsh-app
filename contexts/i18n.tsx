import React, { useState, createContext, useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import EN from '../lang/en.json'
import FR from '../lang/fr.json'

const languages = {
  en: { ...EN },
  fr: { ...FR }
}

type LangTypes = 'en' | 'fr'

type ContextTypes = {
  lang: LangTypes
  changeLanguage: (lang: LangTypes) => void
}

const LanguageContext = createContext<ContextTypes>({
  lang: 'en',
  changeLanguage: (lang: LangTypes) => lang
})

interface Props {
  children: React.ReactNode
}

const LanguageContextProvider: React.FC<Props> = ({ children }) => {
  const [lang, setLang] = useState<LangTypes>('en')
  const [messages, setMessages] = useState(languages[lang])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const l = localStorage.getItem('lang') as LangTypes
      setLang(l ?? 'en')
      setMessages(languages[l ?? 'en'])
    }
  }, [])

  const changeLanguage = (lang: LangTypes) => {
    setLang(lang)
    setMessages(languages[lang])
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage }}>
      <IntlProvider key={lang} locale={lang} messages={messages} defaultLocale={lang}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

export { LanguageContextProvider, LanguageContext }

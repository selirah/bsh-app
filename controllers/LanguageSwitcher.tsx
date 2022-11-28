import React from 'react'
import ENIcon from 'public/i18n/en.svg'
import ENIconFaded from 'public/i18n/en-faded.svg'
import FRIcon from 'public/i18n/fr.svg'
import FRIconFaded from 'public/i18n/fr-faded.svg'
import { LanguageContext, LangTypes } from 'contexts/i18n'

export const LanguageSwitcher = () => {
  const { lang, changeLanguage } = React.useContext(LanguageContext)
  const [locale, setLocale] = React.useState<LangTypes>(lang)

  const onSwitchLanguage = (lang: LangTypes) => {
    localStorage.setItem('lang', lang)
    changeLanguage(lang)
    setLocale(lang)
  }

  return (
    <div className="flex space-x-2">
      {locale === 'en' ? (
        <>
          <ENIcon className="cursor-pointer" onClick={() => onSwitchLanguage('en')} />
          <FRIconFaded className="cursor-pointer" onClick={() => onSwitchLanguage('fr')} />
        </>
      ) : (
        <>
          <ENIconFaded className="cursor-pointer" onClick={() => onSwitchLanguage('en')} />
          <FRIcon className="cursor-pointer" onClick={() => onSwitchLanguage('fr')} />
        </>
      )}
    </div>
  )
}

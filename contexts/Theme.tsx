import { useState, createContext, useEffect } from 'react'

export type ThemeTypes = 'light' | 'dark'

type ContextTypes = {
  theme: ThemeTypes
  changeTheme: (theme: ThemeTypes) => void
}

const ThemeContext = createContext<ContextTypes>(null)

type Props = {
  children: React.ReactNode
}

const ThemeContextProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeTypes>('light')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userTheme = localStorage.getItem('theme') as ThemeTypes
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (userTheme === 'dark' || (!('theme' in localStorage) && systemTheme)) {
        setTheme('dark')
        document.documentElement.classList.add('dark')
      } else {
        setTheme('light')
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  const changeTheme = (theme: ThemeTypes) => {
    setTheme(theme)
  }

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeContextProvider, ThemeContext }

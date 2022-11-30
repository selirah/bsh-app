import React from 'react'
import { ThemeContext, ThemeTypes } from 'contexts/Theme'
import { FiSun, FiMoon } from 'react-icons/fi'

export const ThemeSwitcher = () => {
  const { theme, changeTheme } = React.useContext(ThemeContext)

  const onSwitchTheme = (theme: ThemeTypes) => {
    changeTheme(theme)
    localStorage.setItem('theme', theme)
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      return
    }
    document.documentElement.classList.add(theme)
  }

  return (
    <div className="">
      {theme === 'dark' ? (
        <FiSun
          className="text-pLarge text-light-text dark:text-dark-text cursor-pointer"
          onClick={() => onSwitchTheme('light')}
        />
      ) : (
        <FiMoon
          className="text-pLarge text-light-text dark:text-dark-text cursor-pointer"
          onClick={() => onSwitchTheme('dark')}
        />
      )}
    </div>
  )
}

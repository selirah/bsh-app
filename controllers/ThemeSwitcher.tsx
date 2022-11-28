import React from 'react'
import { ThemeContext, ThemeTypes } from 'contexts/Theme'
import { SunIcon, MoonIcon } from '@heroicons/react/outline'

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
        <SunIcon
          className="w-[24px] h-[24px] text-light-text dark:text-dark-text cursor-pointer"
          onClick={() => onSwitchTheme('light')}
        />
      ) : (
        <MoonIcon
          className="w-[24px] h-[24px] text-light-text dark:text-dark-text cursor-pointer"
          onClick={() => onSwitchTheme('dark')}
        />
      )}
    </div>
  )
}

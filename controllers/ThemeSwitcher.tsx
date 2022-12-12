import { useContext } from 'react'
import { ThemeContext, ThemeTypes } from 'contexts/Theme'
import { IoMoonSharp, IoSunnySharp } from 'react-icons/io5'

export const ThemeSwitcher = () => {
  const { theme, changeTheme } = useContext(ThemeContext)

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
        <IoSunnySharp
          className="text-pLarge text-light-text dark:text-dark-text cursor-pointer"
          onClick={() => onSwitchTheme('light')}
        />
      ) : (
        <IoMoonSharp
          className="text-pLarge text-light-text dark:text-dark-text cursor-pointer"
          onClick={() => onSwitchTheme('dark')}
        />
      )}
    </div>
  )
}

import React from 'react'
import { MenuAlt1Icon /*, MenuIcon*/ } from '@heroicons/react/outline'
import { LanguageSwitcher, ThemeSwitcher, UserProfile } from 'controllers'

export const Navbar = () => {
  return (
    <div className="w-full flex justify-between py-[8px] bg-light-container dark:bg-dark-container">
      <MenuAlt1Icon className="w-[30px] h-[30px] text-light-text dark:text-dark-text cursor-pointer" />
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <div className="flex items-center space-x-2">
          <ThemeSwitcher />
          <UserProfile username="Username" />
        </div>
      </div>
    </div>
  )
}

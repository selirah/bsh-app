import React from 'react'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { LanguageSwitcher, ThemeSwitcher, UserProfile } from 'controllers'
import { LayoutContext } from 'contexts'

export const Navbar = () => {
  const { onSetOpenSideNav, openSideNav } = React.useContext(LayoutContext)

  return (
    <nav className="w-full flex justify-between px-[16px] py-[12px] bg-light-container dark:bg-dark-container shadow-penumbra">
      {openSideNav ? (
        <AiOutlineMenuFold
          className="w-[30px] h-[30px] text-light-text dark:text-dark-text cursor-pointer"
          onClick={onSetOpenSideNav}
        />
      ) : (
        <AiOutlineMenuUnfold
          className="w-[30px] h-[30px] text-light-text dark:text-dark-text cursor-pointer"
          onClick={onSetOpenSideNav}
        />
      )}
      <div className="flex items-center gap-x-4">
        <LanguageSwitcher />
        <div className="flex items-center gap-x-4">
          <ThemeSwitcher />
          <UserProfile username="Username" />
        </div>
      </div>
    </nav>
  )
}

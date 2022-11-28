import React from 'react'
import Image from 'next/image'
import { LanguageSwitcher, ThemeSwitcher } from 'controllers'

export const AuthNav = () => {
  return (
    <div className="w-full flex justify-between py-[8px] bg-light-container dark:bg-dark-container">
      <Image src="/logo.png" alt="logo" width={30} height={30} />
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  )
}

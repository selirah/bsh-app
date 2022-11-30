import React from 'react'
import Image from 'next/image'
import { LanguageSwitcher, ThemeSwitcher } from 'controllers'

export const AuthNav = () => {
  return (
    <nav className="w-full flex justify-between px-[16px] py-[12px]">
      <Image
        src="/logo.png"
        alt="logo"
        width={30}
        height={30}
        style={{ width: 30, height: 30 }}
        priority
      />
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </nav>
  )
}

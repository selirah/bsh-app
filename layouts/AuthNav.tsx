import React from 'react'
import Image from 'next/image'
import { LanguageSwitcher, ThemeSwitcher, ColorSwitcher } from 'controllers'
import Link from 'next/link'

export const AuthNav = () => {
  return (
    <nav className="w-full flex justify-between px-[24px] py-[12px]">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={30}
          height={30}
          style={{ width: 30, height: 30 }}
          priority
        />
      </Link>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        {process.env.NODE_ENV === 'development' ? <ColorSwitcher /> : null}
        <ThemeSwitcher />
      </div>
    </nav>
  )
}

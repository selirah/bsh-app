import React from 'react'
import { AuthNav } from './AuthNav'

interface Props {
  SVG: React.FC<React.SVGProps<SVGSVGElement>>
  children: React.ReactNode
}

export const AuthLayout: React.FC<Props> = (props) => {
  const { SVG, children } = props
  return (
    <div className="block bg-light-container dark:bg-dark-background">
      <AuthNav />
      <div className="flex md:flex sm:block lg:flex h-screen">
        <div className="w-1/2 md:w-1/2 sm:w-full lg:w-1/2 duration-300">{children}</div>
        <div className="w-1/2 flex justify-center items-center px-16">
          <SVG />
        </div>
      </div>
    </div>
  )
}

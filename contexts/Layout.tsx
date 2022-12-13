import React, { useState, createContext, useEffect } from 'react'

export type LayoutTypes = 'mobile' | 'tablet' | 'laptop' | 'desktop'

type ContextTypes = {
  layout: LayoutTypes
  openSideNav: boolean
  onSetOpenSideNav: () => void
}

const LayoutContext = createContext<ContextTypes>(null)

type Props = {
  children: React.ReactNode
}

const LayoutContextProvider: React.FC<Props> = ({ children }) => {
  const [layout, setLayout] = useState<LayoutTypes>('desktop')
  const [openSideNav, setOpenSideNav] = useState(true)

  const handleLayout = () => {
    if (window.innerWidth >= 320 && window.innerWidth <= 480) {
      setLayout('mobile')
      setOpenSideNav(false)
    } else if (window.innerWidth >= 481 && window.innerWidth <= 768) {
      setLayout('tablet')
      setOpenSideNav(false)
    } else if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
      setLayout('laptop')
      setOpenSideNav(true)
    } else if (window.innerWidth > 1024) {
      setLayout('desktop')
      setOpenSideNav(true)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleLayout()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleLayout)
  }, [layout, handleLayout])

  const onSetOpenSideNav = () => {
    setOpenSideNav(!openSideNav)
  }

  return (
    <LayoutContext.Provider value={{ layout, onSetOpenSideNav, openSideNav }}>
      {children}
    </LayoutContext.Provider>
  )
}

export { LayoutContextProvider, LayoutContext }

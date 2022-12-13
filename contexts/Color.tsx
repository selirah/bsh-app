import { useState, createContext, useEffect } from 'react'
import { applyTheme } from 'themes/utils'
import { baseThemeProd, baseThemeUat } from 'themes/base'

export type ColorTypes = 'prod' | 'uat'

type ContextTypes = {
  color: ColorTypes
  changeColor: (color: ColorTypes) => void
}

const ColorContext = createContext<ContextTypes>(null)

type Props = {
  children: React.ReactNode
}

const ColorContextProvider: React.FC<Props> = ({ children }) => {
  const [color, setColor] = useState<ColorTypes>(
    process.env.NODE_ENV === 'production' ? 'prod' : 'uat'
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userColor = localStorage.getItem('color') as ColorTypes
      if (userColor) {
        if (userColor === 'prod') {
          setColor('prod')
        } else {
          setColor('uat')
        }
      }
    }
  }, [])

  useEffect(() => {
    color === 'prod' ? applyTheme(baseThemeProd) : applyTheme(baseThemeUat)
  }, [color])

  const changeColor = (color: ColorTypes) => {
    setColor(color)
  }

  return <ColorContext.Provider value={{ color, changeColor }}>{children}</ColorContext.Provider>
}

export { ColorContextProvider, ColorContext }

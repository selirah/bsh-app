import React from 'react'
import { ThemeContext } from 'contexts'
import { AuthLayout } from 'layouts'
import IllustrationLight from 'public/illustrations/light/welcome.svg'
import IllustrationDark from 'public/illustrations/dark/welcome.svg'

const Home = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <AuthLayout SVG={theme === 'light' ? IllustrationLight : IllustrationDark}>Welcome</AuthLayout>
  )
}

export default Home

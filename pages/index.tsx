import React, { Fragment } from 'react'
import { useSession } from 'next-auth/react'
import { UILoader } from 'components'
import WelcomePage from './auth/welcome'
import Dashboard from './admin/dashboard'

const Home = () => {
  const { status } = useSession()

  const render = () => {
    if (status === 'loading') {
      return <UILoader size="lg" />
    } else if (status === 'unauthenticated') {
      return <WelcomePage />
    } else {
      return <Dashboard />
    }
  }

  return <Fragment>{render()}</Fragment>
}

export default Home

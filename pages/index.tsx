import { Fragment } from 'react'
import { useSession } from 'next-auth/react'
import { UILoader } from 'components'
import Welcome from './auth/welcome'
import Dashboard from './dashboard'

const Home = () => {
  const { status } = useSession()

  const render = () => {
    if (status === 'loading') {
      return <UILoader size="lg" />
    } else if (status === 'unauthenticated') {
      return <Welcome />
    } else {
      return <Dashboard />
    }
  }

  return <Fragment>{render()}</Fragment>
}

export default Home

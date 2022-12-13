import { AuthNav } from './AuthNav'
import { useContext } from 'react'
import Head from 'next/head'
import { useIntl } from 'react-intl'
import { LayoutContext } from 'contexts'
import classnames from 'classnames'
import { ILogin, IWelcome, IForgottenPassword, IResetPassword, IOtp, IBio } from 'illustrations'

type Props = {
  SVG: 'login' | 'welcome' | 'forgottenpassword' | 'resetpassword' | 'bio' | 'otp'
  children: React.ReactNode
}

export const AuthLayout: React.FC<Props> = (props) => {
  const { layout } = useContext(LayoutContext)
  const { SVG, children } = props
  const { formatMessage } = useIntl()

  const renderSVG = () => {
    switch (SVG) {
      case 'welcome':
        return <IWelcome />
      case 'login':
        return <ILogin />
      case 'forgottenpassword':
        return <IForgottenPassword />
      case 'resetpassword':
        return <IResetPassword />
      case 'otp':
        return <IOtp />
      case 'bio':
        return <IBio />
    }
  }
  return (
    <div className="md:h-screen bg-light-container dark:bg-dark-background animate__animated animate__fadeIn">
      <Head>
        <title>
          {formatMessage({ defaultMessage: 'Welcome to Branch Service Hub', description: 'Title' })}
        </title>
      </Head>
      <AuthNav />
      <div
        className={classnames('block md:flex w-full mt-8 md:mt-20', {
          'h-screen': layout === 'mobile'
        })}
      >
        <div className="w-full md:w-1/2 p-[24px]">{children}</div>
        <div className="hidden md:w-1/2 md:flex justify-center items-center p-[24px]">
          {renderSVG()}
        </div>
      </div>
    </div>
  )
}

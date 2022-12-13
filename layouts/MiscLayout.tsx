import { AuthNav } from './AuthNav'
import { useContext } from 'react'
import Head from 'next/head'
import { useIntl } from 'react-intl'
import { LayoutContext } from 'contexts'
import classnames from 'classnames'

type Props = {
  children: React.ReactNode
}

export const MiscLayout: React.FC<Props> = (props) => {
  const { layout } = useContext(LayoutContext)
  const { children } = props
  const { formatMessage } = useIntl()
  return (
    <div className="md:h-screen bg-light-container dark:bg-dark-background animate__animated animate__fadeIn">
      <Head>
        <title>
          {formatMessage({ defaultMessage: 'Welcome to Branch Service Hub', description: 'Title' })}
        </title>
      </Head>
      <AuthNav />
      <div
        className={classnames('block text-center w-full mt-8 md:mt-16 ', {
          'h-screen': layout === 'mobile'
        })}
      >
        {children}
      </div>
    </div>
  )
}

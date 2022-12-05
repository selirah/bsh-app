import { AuthNav } from './AuthNav'
import Head from 'next/head'
import { useIntl } from 'react-intl'

interface Props {
  SVG: React.FC<React.SVGProps<SVGSVGElement>>
  children: React.ReactNode
}

export const AuthLayout: React.FC<Props> = (props) => {
  const { SVG, children } = props
  const { formatMessage } = useIntl()
  return (
    <div className="h-screen bg-light-container dark:bg-dark-background animate__animated animate__fadeIn">
      <Head>
        <title>
          {formatMessage({ defaultMessage: 'Welcome to Branch Service Hub', description: 'Title' })}
        </title>
      </Head>
      <AuthNav />
      <div className="block md:flex w-full mt-16 md:mt-32">
        <div className="w-full md:w-1/2 p-[16px]">{children}</div>
        <div className="hidden md:w-1/2 md:flex justify-center items-center p-[16px]">
          <SVG />
        </div>
      </div>
    </div>
  )
}

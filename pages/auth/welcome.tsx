import { useContext } from 'react'
import { AuthLayout } from 'layouts'
import { LayoutContext } from 'contexts'
import { Button } from 'components'
import { useIntl } from 'react-intl'
import Link from 'next/link'

const WelcomePage = () => {
  const { layout } = useContext(LayoutContext)
  const { formatMessage } = useIntl()

  return (
    <AuthLayout SVG="welcome">
      <div className="md:mt-32">
        <h5 className="text-h6 md:text-h5 text-dark-btnText dark:text-light-btnText font-lato font-medium animate__animated animate__fadeInDown">
          {formatMessage({
            defaultMessage: 'Welcome to Branch Service Hub'
          })}
        </h5>
        <p className="text-pNormal md:text-pLarge mt-[16px] mb-[64px] text-light-text dark:text-dark-text font-montserrat font-light animate__animated animate__fadeInUp">
          {formatMessage({
            defaultMessage: 'Choose your login preference'
          })}
        </p>
        <Link href="/auth/login">
          <Button size={layout === 'mobile' ? 'sm' : 'lg'} block>
            {formatMessage({ defaultMessage: 'Sign in with Basic Auth' })}
          </Button>
        </Link>
        <p className="text-pLarge text-center mt-[16px] mb-[16px] text-light-text dark:text-dark-text font-montserrat font-light animate__animated animate__fadeInUp">
          {formatMessage({
            defaultMessage: 'OR'
          })}
        </p>
        <Button size={layout === 'mobile' ? 'sm' : 'lg'} block color="primary" outline disabled>
          {formatMessage({ defaultMessage: 'Sign in with Azure/ADO' })}
        </Button>
      </div>
    </AuthLayout>
  )
}

export default WelcomePage

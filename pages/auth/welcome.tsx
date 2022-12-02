import { useContext } from 'react'
import { AuthLayout } from 'layouts'
import { ThemeContext } from 'contexts'
// import { Button } from 'components'
import IllustrationLight from 'public/illustrations/light/welcome.svg'
import IllustrationDark from 'public/illustrations/dark/welcome.svg'
import { useIntl } from 'react-intl'

const Welcome = () => {
  const { theme } = useContext(ThemeContext)
  const intl = useIntl()

  return (
    <AuthLayout SVG={theme === 'dark' ? IllustrationDark : IllustrationLight}>
      <h5 className="text-h5 text-dark-btnText dark:text-light-btnText font-lato font-medium animate__animated animate__slideInLeft">
        {intl.formatMessage({
          defaultMessage: 'Welcome to Branch Service Hub',
          description: 'Greetings'
        })}
      </h5>
      <p className="text-pLarge mt-[16px] text-light-text font-montserrat font-light animate__animated animate__fadeInUp">
        {intl.formatMessage({
          defaultMessage: 'Choose your login preference',
          description: 'Login types'
        })}
      </p>
    </AuthLayout>
  )
}

export default Welcome

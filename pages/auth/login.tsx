import { useContext } from 'react'
import { AuthLayout } from 'layouts'
import { ThemeContext, LayoutContext } from 'contexts'
import { Formik, Form } from 'formik'
import { Input, Password, Checkbox } from 'formik-controls'
import { Button /*, AppleLoader*/ } from 'components'
import IllustrationLight from 'public/illustrations/light/login.svg'
import IllustrationDark from 'public/illustrations/dark/login.svg'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { loginValidation } from 'validation-schema'
import { BsShieldCheck } from 'react-icons/bs'
import { MdPassword } from 'react-icons/md'

interface Schema {
  username: string
  password: string
  rememberMe?: boolean
}

const LoginPage = () => {
  const { theme } = useContext(ThemeContext)
  const { layout } = useContext(LayoutContext)
  const intl = useIntl()
  const initialValues: Schema = {
    password: '',
    username: '',
    rememberMe: false
  }

  const onSubmit = (values: Schema) => {
    console.log(values)
  }

  return (
    <AuthLayout SVG={theme === 'dark' ? IllustrationDark : IllustrationLight}>
      <div className="md:mt-32">
        <h5 className="text-h6 md:text-h5 text-dark-btnText dark:text-light-btnText font-lato font-medium animate__animated animate__slideInLeft">
          {intl.formatMessage({
            defaultMessage: 'Login to your account'
          })}
        </h5>
        <p className="text-pNormal md:text-pLarge mt-[16px] mb-[64px] text-light-text dark:text-dark-text font-montserrat font-light animate__animated animate__fadeInUp">
          {intl.formatMessage({
            defaultMessage: 'Enter your username and password to authenticate'
          })}
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={loginValidation(intl)}
        >
          {(formikProps) => (
            <Form>
              <div className="mb-[24px]">
                <Input
                  name="username"
                  IconSVG={BsShieldCheck}
                  iconPosition="trailing"
                  size={layout === 'mobile' ? 'sm' : 'lg'}
                  placeholder={intl.formatMessage({ defaultMessage: 'Enter your username' })}
                  label={intl.formatMessage({ defaultMessage: 'Username' })}
                />
              </div>
              <div className="mb-[24px]">
                <Password
                  name="password"
                  size={layout === 'mobile' ? 'sm' : 'lg'}
                  placeholder={intl.formatMessage({ defaultMessage: 'Enter your password' })}
                  label={intl.formatMessage({ defaultMessage: 'Password' })}
                  IconSVG={MdPassword}
                  iconPosition="trailing"
                />
              </div>
              <div className="mb-[24px] flex justify-between">
                <Checkbox
                  name="rememberMe"
                  size={layout === 'mobile' ? 'sm' : 'lg'}
                  label="Remeber Me"
                />
                <Link href="/auth/forgotten-password">
                  <p className="font-montserrat text-pSmall md:text-pNormal cursor-pointer text-primary">
                    {intl.formatMessage({ defaultMessage: 'Forgotten Password?' })}
                  </p>
                </Link>
              </div>
              <Button
                size="lg"
                type="submit"
                disabled={!formikProps.isValid || formikProps.isSubmitting}
                block
              >
                {intl.formatMessage({ defaultMessage: 'Sign in' })}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  )
}

export default LoginPage

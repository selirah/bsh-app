import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthLayout } from 'layouts'
import { ThemeContext, LayoutContext } from 'contexts'
import { Formik, Form } from 'formik'
import { Input, Password, Checkbox } from 'formik-controls'
import { Button, AppleLoader, Alert } from 'components'
import IllustrationLight from 'public/illustrations/light/login.svg'
import IllustrationDark from 'public/illustrations/dark/login.svg'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { loginValidation } from 'validation-schema'
import { BsShieldCheck } from 'react-icons/bs'
import { MdPassword } from 'react-icons/md'
import { LoginSchema, LoginResponse } from 'schema/Auth'
import { SuccessResponse, ErrorResponse } from 'schema/Axios'
import { useLogin } from 'hooks/auth'
import { onAxiosError } from 'utils'

const LoginPage = () => {
  const { theme } = useContext(ThemeContext)
  const { layout } = useContext(LayoutContext)
  const intl = useIntl()
  const initialValues: LoginSchema = {
    password: '',
    username: '',
    rememberMe: false
  }
  const [error, setError] = useState(null)
  const { push } = useRouter()

  const onLoginSuccess = (response: SuccessResponse) => {
    const { data, headers, status } = response
    if (status === 200 && data && headers) {
      const userData = data as LoginResponse
      const { authMode, userDTO } = userData
      localStorage.setItem('token', headers['x-jwt-token'])
      localStorage.setItem('user', JSON.stringify(userDTO))
      const { requires2StepVerification } = userDTO
      if (requires2StepVerification) {
        if (authMode === 'OTP') {
          push('/auth/otp-auth')
        } else if (authMode === 'BIO') {
          push('/auth/bio-auth')
        } else {
          push('/auth/otp-auth')
        }
      } else {
        push('/auth/unauthorized')
      }
    } else {
      setError(intl.formatMessage({ defaultMessage: 'Invalid Credentials' }))
    }
  }

  const { mutate: loginUser, isLoading } = useLogin(onLoginSuccess, (error: ErrorResponse) =>
    onAxiosError(error, setError)
  )

  const onSubmit = (values: LoginSchema) => {
    loginUser(values)
  }

  return (
    <AuthLayout SVG={theme === 'dark' ? IllustrationDark : IllustrationLight}>
      <div className="md:mt-32">
        <div className="mb-6">{error && <Alert color="error">{error}</Alert>}</div>
        <h5 className="text-h6 md:text-h5 text-dark-btnText dark:text-light-btnText font-lato font-medium animate__animated animate__fadeInDown">
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
          {({ isValid }) => (
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
                size={layout === 'mobile' ? 'sm' : 'lg'}
                type="submit"
                disabled={!isValid || isLoading}
                block
              >
                <div className="flex items-center space-x-2">
                  {isLoading && <AppleLoader size="lg" />}
                  <span>
                    {isLoading
                      ? intl.formatMessage({ defaultMessage: 'Processing...' })
                      : intl.formatMessage({ defaultMessage: 'Sign in' })}
                  </span>
                </div>
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  )
}

export default LoginPage

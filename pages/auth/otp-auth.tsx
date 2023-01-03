import { useContext, useState } from 'react'
import { AuthLayout } from 'layouts'
import { LayoutContext } from 'contexts'
import { Formik, Form } from 'formik'
import { OtpCode } from 'examples/formik-controls'
import { Button, AppleLoader, Alert } from 'components'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { otpValidation } from 'validation-schema'
import { OtpSchema, UserDTO } from 'types/Auth'
import { SuccessResponse, ErrorResponse } from 'types/Axios'
import { useValidateOtp } from 'hooks/auth'
import { onAxiosError } from 'utils'
import { signIn, getSession } from 'next-auth/react'

const OtpAuthPage = () => {
  const { layout } = useContext(LayoutContext)
  const intl = useIntl()
  const initialValues: OtpSchema = {
    authMode: 'OTP',
    email: '',
    otp: '',
    limitedToken: '',
    username: ''
  }
  const [error, setError] = useState(null)

  const onValidationSuccess = async (response: SuccessResponse) => {
    const { data, headers, status } = response
    if (status === 200 && data && headers) {
      data.token = headers['x-jwt-token']
      const { status: authStatus } = await signIn('credentials', {
        data: JSON.stringify(data),
        redirect: false
      })
      if (authStatus === 200) {
        const session = await getSession()
        if (session) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = '/admin/dashboard'
        } else {
          setError(intl.formatMessage({ defaultMessage: 'Invalid OTP' }))
        }
      }
    } else {
      setError(intl.formatMessage({ defaultMessage: 'Invalid OTP' }))
    }
  }

  const { mutate: validateOtp, isLoading } = useValidateOtp(
    onValidationSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onSubmit = (values: OtpSchema) => {
    const token = localStorage.getItem('token')
    const user: UserDTO = JSON.parse(localStorage.getItem('user'))
    values.email = user ? user.email : ''
    values.username = user ? user.username : ''
    values.limitedToken = token ?? ''
    validateOtp(values)
  }

  return (
    <AuthLayout SVG="otp">
      <div className="md:mt-32">
        <div className="mb-6">{error && <Alert color="error">{error}</Alert>}</div>
        <h5 className="text-h6 md:text-h5 text-dark-btnText dark:text-light-btnText font-lato font-medium animate__animated animate__fadeInDown">
          {intl.formatMessage({
            defaultMessage: 'OTP verification'
          })}
        </h5>
        <p className="text-pNormal md:text-pLarge mt-[16px] mb-[64px] text-light-text dark:text-dark-text font-montserrat font-light animate__animated animate__fadeInUp">
          {intl.formatMessage({
            defaultMessage: 'Enter the OTP verification code sent to your email'
          })}
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={otpValidation(intl)}
        >
          {({ isValid }) => (
            <Form>
              <div className="mb-[32px] w-full">
                <OtpCode name="otp" size={layout === 'mobile' ? 'sm' : 'lg'} disabled={isLoading} />
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
                      : intl.formatMessage({ defaultMessage: 'Verify' })}
                  </span>
                </div>
              </Button>
            </Form>
          )}
        </Formik>
        <p className="text-pLarge text-center mt-[16px] mb-[16px] text-light-text dark:text-dark-text font-montserrat font-light animate__animated animate__fadeInUp">
          {intl.formatMessage({
            defaultMessage: 'OR'
          })}
        </p>
        <Link href="/auth/login">
          <Button size={layout === 'mobile' ? 'sm' : 'lg'} block color="primary" outline>
            {intl.formatMessage({ defaultMessage: 'Back to Login' })}
          </Button>
        </Link>
      </div>
    </AuthLayout>
  )
}

export default OtpAuthPage

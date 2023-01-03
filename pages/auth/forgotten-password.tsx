import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthLayout } from 'layouts'
import { LayoutContext } from 'contexts'
import { Formik, Form } from 'formik'
import { Input } from 'examples/formik-controls'
import { Button, AppleLoader, Alert } from 'components'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { forgottenPasswordValidation } from 'validation-schema'
import { BsShieldCheck } from 'react-icons/bs'
import { ForgottenPasswordSchema, ForgottenPasswordResponse } from 'types/Auth'
import { SuccessResponse, ErrorResponse } from 'types/Axios'
import { useForgottenPasswordRequest } from 'hooks/auth'
import { onAxiosError } from 'utils'

const ForgottenPasswordPage = () => {
  const { layout } = useContext(LayoutContext)
  const intl = useIntl()
  const [error, setError] = useState(null)
  const { push } = useRouter()

  const initialValues: ForgottenPasswordSchema = {
    username: ''
  }

  const onSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      const obj: ForgottenPasswordResponse = data
      push(`/auth/reset-password?PID=${obj.processId}`)
    } else {
      setError(intl.formatMessage({ defaultMessage: 'An error on the server' }))
    }
  }

  const { mutate: forgottenPasswordRequest, isLoading } = useForgottenPasswordRequest(
    onSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onSubmit = (values: ForgottenPasswordSchema) => {
    localStorage.setItem('username', values.username)
    forgottenPasswordRequest(values)
  }

  return (
    <AuthLayout SVG="forgottenpassword">
      <div className="md:mt-32">
        <div className="mb-6">{error && <Alert color="error">{error}</Alert>}</div>
        <h5 className="text-h6 md:text-h5 text-dark-btnText dark:text-light-btnText font-lato font-medium animate__animated animate__fadeInDown">
          {intl.formatMessage({
            defaultMessage: 'Send password change request'
          })}
        </h5>
        <p className="text-pNormal md:text-pLarge mt-[16px] mb-[64px] text-light-text dark:text-dark-text font-montserrat font-light animate__animated animate__fadeInUp">
          {intl.formatMessage({
            defaultMessage: 'Enter your username to reset your password'
          })}
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={forgottenPasswordValidation(intl)}
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
                  disabled={isLoading}
                />
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
                      : intl.formatMessage({ defaultMessage: 'Send Instructions' })}
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

export default ForgottenPasswordPage

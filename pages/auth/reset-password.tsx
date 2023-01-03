import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthLayout } from 'layouts'
import { LayoutContext } from 'contexts'
import { Formik, Form } from 'formik'
import { Password } from 'examples/formik-controls'
import { Button, AppleLoader, Alert } from 'components'
import { useIntl } from 'react-intl'
import { passwordResetValidation } from 'validation-schema'
import { MdPassword } from 'react-icons/md'
import { ResetPasswordSchema } from 'types/Auth'
import { SuccessResponse, ErrorResponse } from 'types/Axios'
import { useResetPassword } from 'hooks/auth'
import { onAxiosError } from 'utils'

const ResetPasswordPage = () => {
  const { layout } = useContext(LayoutContext)
  const intl = useIntl()
  const [error, setError] = useState(null)
  const { isReady, query } = useRouter()
  const [success, setSuccess] = useState(false)
  const [processId, setProcessId] = useState('')

  const initialValues: ResetPasswordSchema = {
    username: '',
    password: '',
    processId: '',
    confirmPassword: ''
  }

  useEffect(() => {
    if (isReady) {
      const processId = query.PID as string
      setProcessId(processId)
    }
  }, [isReady])

  const onSuccess = (response: SuccessResponse) => {
    const { status } = response
    if (status === 200) {
      localStorage.removeItem('username')
      setSuccess(true)
    } else {
      setError(intl.formatMessage({ defaultMessage: 'An error on the server' }))
    }
  }

  const { mutate: resetPassword, isLoading } = useResetPassword(onSuccess, (error: ErrorResponse) =>
    onAxiosError(error, setError)
  )

  const onSubmit = (values: ResetPasswordSchema) => {
    const username = localStorage.getItem('username')
    values.username = username
    values.processId = processId
    resetPassword(values)
  }

  return (
    <AuthLayout SVG="resetpassword">
      <div className="md:mt-32">
        <div className="mb-6">{error && <Alert color="error">{error}</Alert>}</div>
        <div className="mb-6">
          {success && (
            <Alert color="success" border>
              <h6 className="font-lato text-pNormal font-medium">
                {intl.formatMessage({ defaultMessage: 'Nice!' })}
              </h6>
              <p className="font-montserrat font-light">
                {intl.formatMessage({
                  defaultMessage:
                    'Your old password has successfully been reset to this new password. You can use it now to login'
                })}
              </p>
            </Alert>
          )}
        </div>
        <h5 className="text-h6 md:text-h5 text-dark-btnText dark:text-light-btnText font-lato font-medium animate__animated animate__fadeInDown">
          {intl.formatMessage({
            defaultMessage: 'Reset password'
          })}
        </h5>
        <p className="text-pNormal md:text-pLarge mt-[16px] mb-[64px] text-light-text dark:text-dark-text font-montserrat font-light animate__animated animate__fadeInUp">
          {intl.formatMessage({
            defaultMessage: 'Enter your new password and confirm'
          })}
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={passwordResetValidation(intl)}
        >
          {({ isValid }) => (
            <Form>
              <div className="mb-[24px]">
                <Password
                  name="password"
                  size={layout === 'mobile' ? 'sm' : 'lg'}
                  placeholder={intl.formatMessage({ defaultMessage: 'Enter your new password' })}
                  label={intl.formatMessage({ defaultMessage: 'New Password' })}
                  IconSVG={MdPassword}
                  iconPosition="trailing"
                  disabled={isLoading}
                />
              </div>
              <div className="mb-[24px]">
                <Password
                  name="confirmPassword"
                  size={layout === 'mobile' ? 'sm' : 'lg'}
                  placeholder={intl.formatMessage({ defaultMessage: 'Confirm your new password' })}
                  label={intl.formatMessage({ defaultMessage: 'Confirm Password' })}
                  IconSVG={MdPassword}
                  iconPosition="trailing"
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
                      : intl.formatMessage({ defaultMessage: 'Reset Password' })}
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

export default ResetPasswordPage

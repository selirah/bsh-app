import { useContext, useState, useEffect } from 'react'
import { AuthLayout } from 'layouts'
import { LayoutContext, LanguageContext } from 'contexts'
import { Button, AppleLoader, Alert, FingerPrint, Select } from 'components'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { UserDTO, BioDeviceResponse, BioSchema, FingerPrintSchema } from 'types'
import { SuccessResponse, ErrorResponse } from 'types/Axios'
import { useBioInit, useValidateBio } from 'hooks/auth'
import { onAxiosError } from 'utils'
import { signIn, getSession } from 'next-auth/react'
import { fingerListTranslated } from 'mock/fingerPrintData'

const BioAuthPage = () => {
  const { layout } = useContext(LayoutContext)
  const { lang } = useContext(LanguageContext)
  const intl = useIntl()
  const [error, setError] = useState(null)
  const [bioDeviceStatus, setBioDeviceStatus] = useState<'init' | 'success' | 'error'>('init')
  const [finger, setFinger] = useState(null)

  const onBioInitSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      let fingers: FingerPrintSchema[] = []
      const fpObj = data as BioDeviceResponse
      if (fpObj && fpObj.ErrorCode === 0) {
        if (fpObj.BMPBase64 && fpObj.BMPBase64.length > 0) {
          if (fpObj.ImageQuality && fpObj.ImageQuality < 70) {
            setError(
              intl.formatMessage({
                defaultMessage:
                  'Fingerprint image has low quality. Clean your thumb and the scanner and try again'
              })
            )
            setBioDeviceStatus('error')
          } else {
            setBioDeviceStatus('success')
            fingers.push({
              image: {
                data: fpObj.BMPBase64,
                format: 'BMP',
                resolutionDpi: fpObj.ImageDPI
              },
              position: finger.value
            })
            const token = localStorage.getItem('token')
            const user: UserDTO = JSON.parse(localStorage.getItem('user'))
            const payload: BioSchema = {
              searchCriteria: {
                label: 'cif',
                value: user ? user.externalCustomerId : ''
              },
              fingerPrints: fingers,
              limitedToken: token
            }
            validateBio(payload)
          }
        }
      } else {
        setError(
          intl.formatMessage({
            defaultMessage: 'Failed to capture fingerprint, please retry'
          })
        )
        setBioDeviceStatus('error')
      }
    } else {
      setError(
        intl.formatMessage({
          defaultMessage: 'Biometric device drivers must be installed on this computer'
        })
      )
      setBioDeviceStatus('error')
    }
  }

  const onBioVerifySuccess = async (response: SuccessResponse) => {
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
          setError(intl.formatMessage({ defaultMessage: 'Bio Verification Failed' }))
        }
      }
    } else {
      setError(intl.formatMessage({ defaultMessage: 'Bio Verification Failed' }))
    }
  }

  const { mutate: requestBioInit } = useBioInit(onBioInitSuccess, (error: ErrorResponse) =>
    onAxiosError(error, setError)
  )

  const { mutate: validateBio, isLoading } = useValidateBio(
    onBioVerifySuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      requestBioInit()
    }
  }, [])

  return (
    <AuthLayout SVG="bio">
      <div className="md:mt-16">
        <div className="mb-6">{error && <Alert color="error">{error}</Alert>}</div>
        <h5 className="text-h6 md:text-h5 text-dark-btnText dark:text-light-btnText font-lato font-medium animate__animated animate__fadeInDown">
          {intl.formatMessage({
            defaultMessage: 'Bio verification'
          })}
        </h5>
        <p className="text-pNormal md:text-pLarge mt-[16px] mb-[64px] text-light-text dark:text-dark-text font-montserrat font-light animate__animated animate__fadeInUp">
          {intl.formatMessage({
            defaultMessage: 'Place your finger on the biometric scanner to verify your identity'
          })}
        </p>
        <div className="mb-[32px]">
          <Select.Single
            size={layout === 'mobile' ? 'sm' : 'lg'}
            options={fingerListTranslated(lang)}
            onChange={setFinger}
            disabled={isLoading}
          />
        </div>
        <div className="mb-[32px] w-full flex justify-center">
          <FingerPrint
            size={layout === 'mobile' ? 'sm' : 'lg'}
            color={
              bioDeviceStatus === 'error'
                ? 'error'
                : bioDeviceStatus === 'success'
                ? 'success'
                : 'default'
            }
          />
        </div>
        <Button
          size={layout === 'mobile' ? 'sm' : 'lg'}
          type="submit"
          disabled={!finger || isLoading}
          block
        >
          <div className="flex items-center space-x-2">
            {isLoading && <AppleLoader size="lg" />}
            <span>
              {isLoading
                ? intl.formatMessage({ defaultMessage: 'Processing...' })
                : intl.formatMessage({
                    defaultMessage: 'Place your finger on the scanner to scan'
                  })}
            </span>
          </div>
        </Button>
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

export default BioAuthPage

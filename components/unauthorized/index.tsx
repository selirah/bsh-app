import { MiscLayout } from 'layouts'
import { I401 } from 'illustrations'
import { useIntl } from 'react-intl'
import Link from 'next/link'

export const Unauthorized = () => {
  const intl = useIntl()

  return (
    <MiscLayout>
      <h1 className="font-lato mb-4 font-regular text-h6 md:text-h1 animate__animated animate__fadeInDown text-dark-btnText dark:text-light-btnText">
        {intl.formatMessage({ defaultMessage: 'You are not authorized' })}
      </h1>
      <p className="font-montserrat mb-10 font-light text-pNormal md:text-pLarge animate__animated animate__fadeInUp text-light-text dark:text-dark-text">
        {intl.formatMessage({
          defaultMessage: 'You do not have the required permission to access this page'
        })}{' '}
        <Link href="/" className="underline font-bold text-primary">
          {intl.formatMessage({ defaultMessage: 'Return Home' })}
        </Link>
      </p>
      <div className="hidden md:flex justify-center">
        <I401 />
      </div>
    </MiscLayout>
  )
}

import { MiscLayout } from 'layouts'
import Link from 'next/link'
import { I500 } from 'illustrations'
import { useIntl } from 'react-intl'

const ServerErrorPage = () => {
  const intl = useIntl()

  return (
    <MiscLayout>
      <h1 className="font-lato mb-4 font-regular text-h6 md:text-h1 animate__animated animate__fadeInDown text-dark-btnText dark:text-light-btnText">
        {intl.formatMessage({ defaultMessage: 'Something went wrong' })}
      </h1>
      <p className="font-montserrat mb-10 font-light text-pNormal md:text-pLarge animate__animated animate__fadeInUp text-light-text dark:text-dark-text">
        {intl.formatMessage({
          defaultMessage: 'This could be due to server error somewhere'
        })}{' '}
        <Link href="/" className="underline font-bold text-primary">
          {intl.formatMessage({ defaultMessage: 'Return Home' })}
        </Link>
      </p>
      <div className="hidden md:flex justify-center">
        <I500 />
      </div>
    </MiscLayout>
  )
}

export default ServerErrorPage

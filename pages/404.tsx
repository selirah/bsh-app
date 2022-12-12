import { MiscLayout } from 'layouts'
import { I404 } from 'illustrations'
import { useIntl } from 'react-intl'
import Link from 'next/link'

const NotFoundPage = () => {
  const intl = useIntl()

  return (
    <MiscLayout>
      <h1 className="font-lato mb-4 font-regular text-h6 md:text-h1 animate__animated animate__fadeInDown text-dark-btnText dark:text-light-btnText">
        {intl.formatMessage({ defaultMessage: 'Page not found!' })}
      </h1>
      <p className="font-montserrat mb-10 font-light text-pNormal md:text-pLarge animate__animated animate__fadeInUp text-light-text dark:text-dark-text">
        {intl.formatMessage({
          defaultMessage: 'The page you are looking for cannot be found'
        })}{' '}
        <Link href="/" className="underline font-bold text-primary">
          {intl.formatMessage({ defaultMessage: 'Return Home' })}
        </Link>
      </p>
      <div className="hidden md:flex justify-center">
        <I404 />
      </div>
    </MiscLayout>
  )
}

export default NotFoundPage

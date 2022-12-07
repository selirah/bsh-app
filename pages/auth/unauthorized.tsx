import { MiscLayout } from 'layouts'
import Illustration from 'public/illustrations/unauthorized.svg'
import { useIntl } from 'react-intl'

const UnauthorizedPage = () => {
  const intl = useIntl()

  return (
    <MiscLayout>
      <h1 className="font-lato mb-4 font-regular text-h6 md:text-h1 animate__animated animate__fadeInDown text-dark-btnText dark:text-light-btnText">
        {intl.formatMessage({ defaultMessage: 'You are not authorized' })}
      </h1>
      <p className="font-montserrat mb-10 font-light text-pNormal md:text-pLarge animate__animated animate__fadeInUp text-light-text dark:text-dark-text">
        {intl.formatMessage({
          defaultMessage: 'You do not have the required permission to access this page'
        })}
      </p>
      <div className="hidden md:flex justify-center">
        <Illustration />
      </div>
    </MiscLayout>
  )
}

export default UnauthorizedPage

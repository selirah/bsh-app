import { useContext } from 'react'
import { Formik, Form } from 'formik'
import { Input, SelectInput } from 'examples/formik-controls'
import { LanguageContext, LayoutContext } from 'contexts'
import { Button, AppleLoader } from 'components'
import {
  CustomerSearchPayload,
  Customer,
  CustomerAccount,
  SuccessResponse,
  ErrorResponse
} from 'types'
import { optionsTranslated } from 'mock/customerSearchData'
import { useIntl } from 'react-intl'
import { useSearchCustomer } from 'hooks/customer'
import { customerSearchValidation } from 'validation-schema'
import { MdPersonSearch } from 'react-icons/md'
import { onAxiosError } from 'utils'

type Props = {
  setCustomer: (customer: Customer) => void
  setError: (error: string) => void
  setCustomerAccounts?: (customerAccounts: CustomerAccount[]) => void
}

export const CustomerSearchForm: React.FC<Props> = (props) => {
  const { setCustomer, setCustomerAccounts, setError } = props
  const { lang } = useContext(LanguageContext)
  const { layout } = useContext(LayoutContext)
  const intl = useIntl()
  const initialValues: CustomerSearchPayload = {
    propertyData: '',
    searchProperty: null
  }

  const onCustomerSearchSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      const obj = data as Customer
      setCustomer(obj)
      let arr: CustomerAccount[] = []
      obj.accountDetails.map((a) => {
        return arr.push({ name: `${a.currency} - ${a.schemeType} - ${a.accountNumber}`, ...a })
      })
      setCustomerAccounts(arr)
    }
  }

  const { mutate: searchCustomer, isLoading } = useSearchCustomer(
    onCustomerSearchSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onSubmit = (values: CustomerSearchPayload) => {
    setError(null)
    searchCustomer(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={customerSearchValidation(intl)}
    >
      {({ isValid }) => (
        <Form>
          <div className="md:flex md:space-x-4 block">
            <div className="md:w-1/2 mb-4">
              <SelectInput
                options={optionsTranslated(lang)}
                name="searchProperty"
                placeholder={intl.formatMessage({ defaultMessage: 'Select criteria' })}
                size={layout === 'mobile' ? 'sm' : 'md'}
              />
            </div>
            <div className="md:w-1/2 mb-4">
              <Input
                name="propertyData"
                placeholder={intl.formatMessage({ defaultMessage: 'Enter search text . . .' })}
                size={layout === 'mobile' ? 'sm' : 'md'}
              />
            </div>
            <div className="">
              <Button
                type="submit"
                block
                disabled={!isValid || isLoading}
                size={layout === 'mobile' ? 'sm' : 'md'}
              >
                <div className="flex items-center space-x-2">
                  {isLoading ? <AppleLoader size="md" /> : <MdPersonSearch />}
                  <span>
                    {isLoading
                      ? intl.formatMessage({ defaultMessage: 'Processing...' })
                      : intl.formatMessage({ defaultMessage: 'Search' })}
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

import * as Yup from 'yup'
import { IntlShape } from 'react-intl'

export const customerSearchValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    propertyData: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Search value is required' })
    ),
    searchProperty: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Customer search criteria is required' }))
      .nullable()
  })
}

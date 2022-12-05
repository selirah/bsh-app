import * as Yup from 'yup'
import { IntlShape } from 'react-intl'

export const loginValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    username: Yup.string().required(intl.formatMessage({ defaultMessage: 'Username is required' })),
    password: Yup.string()
      .required(intl.formatMessage({ defaultMessage: 'Password is required' }))
      .min(8, intl.formatMessage({ defaultMessage: 'Password should have at least 8 characters' }))
  })
}

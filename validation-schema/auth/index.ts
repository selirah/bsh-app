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

export const otpValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    otp: Yup.string()
      .required(intl.formatMessage({ defaultMessage: 'OTP code is required' }))
      .max(6, intl.formatMessage({ defaultMessage: 'OTP code must be 6' }))
  })
}

export const forgottenPasswordValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    username: Yup.string().required(intl.formatMessage({ defaultMessage: 'Username is required' }))
  })
}

export const passwordResetValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    password: Yup.string()
      .required(intl.formatMessage({ defaultMessage: 'Password is required' }))
      .min(8, intl.formatMessage({ defaultMessage: 'Password should have at least 8 characters' })),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match!')
  })
}

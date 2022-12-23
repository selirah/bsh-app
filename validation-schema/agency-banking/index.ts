import * as Yup from 'yup'
import { IntlShape } from 'react-intl'

export const agentTypeValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    agentType: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Agent type is required' })
    )
  })
}

export const masterAgentStepTwoValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    branch: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Branch is required' }))
      .nullable(),
    agentName: Yup.string().required('Agent name is required'),
    usdCommissionAccount: Yup.object().required('Agent commission account is required').nullable(),
    cdfCommissionAccount: Yup.object().required('Agent commission account is required').nullable()
  })
}

export const subAgentStepTwoValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    agentCode: Yup.string().required('Master/Sub Agent code is required'),
    branch: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Branch is required' }))
      .nullable(),
    agentName: Yup.string().required('Agent name is required'),
    usdCommissionAccount: Yup.object().required('Agent commission account is required').nullable(),
    cdfCommissionAccount: Yup.object().required('Agent commission account is required').nullable()
  })
}

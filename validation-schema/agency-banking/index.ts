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
    agentName: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Agent name is required' })
    ),
    usdCommissionAccount: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Agent commission account is required' }))
      .nullable(),
    cdfCommissionAccount: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Agent commission account is required' }))
      .nullable()
  })
}

export const subAgentStepTwoValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    agentCode: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Master/Sub Agent code is required' })
    ),
    branch: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Branch is required' }))
      .nullable(),
    agentName: Yup.string().required('Agent name is required'),
    usdCommissionAccount: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Agent commission account is required' }))
      .nullable(),
    cdfCommissionAccount: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Agent commission account is required' }))
      .nullable()
  })
}

export const outletStepOneValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    agentCode: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Master/Sub Agent code is required' })
    ),
    branch: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Branch is required' }))
      .nullable(),
    usdCommissionAccount: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Agent commission account is required' }))
      .nullable(),
    cdfCommissionAccount: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Agent commission account is required' }))
      .nullable(),
    usdTradingAccount: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Agent commission account is required' }))
      .nullable(),
    cdfTradingAccount: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Agent commission account is required' }))
      .nullable()
  })
}

export const outletStepTwoValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    agentName: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Outlet name is required' })
    ),
    phoneNumber: Yup.string()
      .required(intl.formatMessage({ defaultMessage: 'Outlet phone number is required' }))
      .min(12, intl.formatMessage({ defaultMessage: 'Phone number must be 12 digits' }))
      .max(12, intl.formatMessage({ defaultMessage: 'Phone number must be 12 digits' })),
    agencyManagerName: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Outlet manager name is required' })
    ),
    agencyManagerPhone: Yup.string()
      .required(intl.formatMessage({ defaultMessage: 'Outlet manager phone is required' }))
      .min(12, intl.formatMessage({ defaultMessage: 'Phone number must be 12 digits' }))
      .max(12, intl.formatMessage({ defaultMessage: 'Phone number must be 12 digits' })),
    agencyRegion: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Region is required' })
    ),
    agencyProvince: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Province is required' })
    )
  })
}

export const outletStepThreeValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    agencyTerritory: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Territory is required' })
    ),
    agencySector: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Sector is required' })
    ),
    agencyCommune: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Commune is required' })
    ),
    agencyStreet: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Street name is required' })
    ),
    agencyBuilding: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Building name is required' })
    ),
    latitude: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'GPRS coordinates is required' })
    )
  })
}

export const outletEditValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    branch: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Branch is required' }))
      .nullable(),
    usdCommissionAccount: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Agent commission account is required' }))
      .nullable(),
    cdfCommissionAccount: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Agent commission account is required' }))
      .nullable(),
    usdTradingAccount: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Agent commission account is required' }))
      .nullable(),
    cdfTradingAccount: Yup.object()
      .required(intl.formatMessage({ defaultMessage: 'Agent commission account is required' }))
      .nullable(),
    agentName: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Outlet name is required' })
    ),
    agencyManagerName: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Outlet manager name is required' })
    ),
    agencyManagerPhone: Yup.string()
      .required(intl.formatMessage({ defaultMessage: 'Outlet manager phone is required' }))
      .min(12, intl.formatMessage({ defaultMessage: 'Phone number must be 12 digits' }))
      .max(12, intl.formatMessage({ defaultMessage: 'Phone number must be 12 digits' })),
    agencyRegion: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Region is required' })
    ),
    agencyProvince: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Province is required' })
    ),
    agencyTerritory: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Territory is required' })
    ),
    agencySector: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Sector is required' })
    ),
    agencyCommune: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Commune is required' })
    ),
    agencyStreet: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Street name is required' })
    ),
    agencyBuilding: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Building name is required' })
    ),
    latitude: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'GPRS coordinates is required' })
    )
  })
}

export const reasonValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    reason: Yup.string().required(intl.formatMessage({ defaultMessage: 'Reason is required' }))
  })
}

export const outletUserValidation = (intl: IntlShape) => {
  return Yup.object().shape({
    outletCode: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'Outlet code is required' })
    ),
    name: Yup.string().required(intl.formatMessage({ defaultMessage: 'User name is required' })),
    idNumber: Yup.string().required(
      intl.formatMessage({ defaultMessage: 'ID number is required' })
    ),
    msisdn: Yup.string()
      .required(intl.formatMessage({ defaultMessage: 'User phone number is required' }))
      .min(12, intl.formatMessage({ defaultMessage: 'Phone number must be 12 digits' }))
      .max(12, intl.formatMessage({ defaultMessage: 'Phone number must be 12 digits' }))
  })
}

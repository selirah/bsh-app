import { Option } from 'types'

const options: Option[] = [
  {
    value: 'CIF',
    label: 'CIF'
  },
  {
    value: 'AccountNumber',
    label: 'Account number'
  },
  {
    value: 'IdNumber',
    label: 'ID number'
  },
  {
    value: 'PassportNumber',
    label: 'Passport number'
  },
  {
    value: 'MobileNumber',
    label: 'Mobile number'
  },
  {
    value: 'DriverLicence',
    label: 'Drivers license'
  }
]

const optionsFr: Option[] = [
  {
    value: 'CIF',
    label: 'CIF'
  },
  {
    value: 'AccountNumber',
    label: 'Numéro de compte'
  },
  {
    value: 'IdNumber',
    label: 'Numéro du document d’identification'
  },
  {
    value: 'PassportNumber',
    label: 'Numéro de passeport'
  },
  {
    value: 'MobileNumber',
    label: 'Numéro de téléphone portable'
  },
  {
    value: 'DriverLicence',
    label: 'Permis de conduire'
  }
]

export const optionsTranslated = (lang: string) => {
  return lang === 'en'.toLowerCase() ? options : optionsFr
}

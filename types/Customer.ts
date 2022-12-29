import { Option } from './Common'

export type CustomerAccount = {
  name?: string
  accountClosureFlag: string
  accountId: string
  accountName: string
  accountNumber: string
  accountOwnerShip: string
  accountStatus: string
  availableBalance: number
  bankId: unknown
  bankName: unknown
  branchCode: string
  clientId: string
  currency: string
  custName: unknown
  depositAmount: number
  firstName: unknown
  freezeCode: string
  interestRate: number
  lastName: unknown
  ledgerBalance: number
  maturityDate: string
  openingDate: string
  rcc: unknown
  schemeCode: string
  schemeType: string
  signature: unknown
  vat: unknown
}

export type Customer = {
  accountDetails: CustomerAccount[]
  clientId: number
  community: unknown
  companyRegsitrationNumber: unknown
  constCode: unknown
  contracts: unknown
  customerID: string
  customerMinorFlag: unknown
  customerNreFlag: string
  dateOfBirth: string
  dateOfIncorporation: string
  emailId: string
  firstName: string
  fullName: string
  identityDocument: string
  lastName: string
  legalEntityTypeId: string
  legalRepresentatives: CustomerLegalRep[]
  maritalStatus: unknown
  nationalId: unknown
  phoneNumber: string
  placeOfBirth: unknown
  preferredAddress: CustomerAddress
  retCorpFlg: unknown
  sex: string
  shortName: unknown
  titleCode: unknown
  userSubClassification: unknown
  docDescr: string
  memos: string[]
}

export type CustomerLegalRep = {
  clientId: number
  customerId: string
  dateOfBirth: unknown
  fullName: unknown
  isActive: boolean
  relationTypeId: number
  relationTypeName: string
  sex: unknown
  token: number
}

export type CustomerAddress = {
  address1: string
  address2: string
  address3: string
  addressCategory: unknown
  cityCode: string
  cityCodeDesc: string
  countryCode: string
  freeTextLabel: unknown
  holdMailFlag: unknown
  pinCode: string
  preferredAddress: unknown
  preferredFormat: unknown
  startDate: string
  stateCode: string
}

export type CustomerBiometric = {
  isActive: string
  isExpired: string
  isMandatory: unknown
  signatureId: unknown
  acctId: number
  effectiveDate: string
  isViewRestricted: unknown
  remarks: unknown
  customerName: string
  returnedSignature: unknown
  imageAccessCode: unknown
  signatureGroupName: unknown
  signRequestId: unknown
  photoIsMandatory: unknown
  returnedPhotograph: unknown
}

export type CustomerSearchPayload = {
  searchProperty?: Option
  propertyData?: string
  userId?: string
}

export type CustomerBiometricPayload = {
  accountId?: string
  customerID?: string
}

export type CustomerRelatedParty = {
  externalClientId: string
  accountName: string
  authority: string
}

export type CustomerJointAccount = {
  cooporateStatus: string
  mandate: string
  details: CustomerRelatedParty[]
}

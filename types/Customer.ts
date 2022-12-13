export type CustomerAccount = {
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
  customerId: string
  customerMinorFlag: unknown
  customerNreFlag: string
  dateOfBirth: string
  dateOfIncorporation: unknown
  emailId: unknown
  firstName: unknown
  fullName: unknown
  identityDocument: unknown
  lastName: unknown
  legalEntityTypeId: string
  legalRepresentatives: CustomerLegalRep[]
  maritalStatus: unknown
  nationalId: unknown
  phoneNumber: unknown
  placeOfBirth: unknown
  preferredAddress: CustomerAddress
  retCorpFlg: unknown
  sex: unknown
  shortName: unknown
  titleCode: unknown
  userSubClassification: unknown
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
  address1: unknown
  address2: unknown
  address3: unknown
  addressCategory: unknown
  cityCode: unknown
  cityCodeDesc: unknown
  countryCode: unknown
  freeTextLabel: unknown
  holdMailFlag: unknown
  pinCode: unknown
  preferredAddress: unknown
  preferredFormat: unknown
  startDate: unknown
  stateCode: unknown
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
  searchProperty?: string
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

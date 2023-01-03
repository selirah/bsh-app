export type KeyValuePair = {
  [key: string]: unknown
}

export type FilterPayload = {
  keyword?: string
  filters?: KeyValuePair
  sort?: {
    by: string
    order: string
  }
  page?: {
    size: number
    number: number
  }
  userId?: number
  periodFrom?: string
  periodTo?: string
  agentId?: number
}

export type Branch = {
  branchId: number
  id: number
  name: string
  city: string
  externalId: string
  headOffice: boolean
  branchGuid: string
  region: unknown
  regionId: number
  users: unknown
  modifiedById: number
}

export type Classifier = {
  id: string
  name: string
  propName?: string
  hasexpiration?: boolean
}

export type CurrencyPair = {
  currencyFrom: string
  currencyTo: string
  isBaseCurrency: boolean
}

export type CurrencyPairPayload = {
  currencyFrom: string
  currencyTo: string
}

export type CashboxPayload = {
  externalUserId: string
  externalBranchId: string
  currency: string
  getDenominations?: boolean
}

export type Cashbox = {
  accountNumber: string
  contractValue: number
  currency: string
}

export type Denomination = {
  type: string
  value: string
  number: number
  available: number
}

export type DenominationTxPayload = {
  denominations: Denomination[]
  currency?: string
  narration?: string
  tellerUserId: string
  cashBoxAccount: string
  fefnum?: string
  amount?: number
  externalBranchId?: number
}

export type CheckStatusPayload = {
  instrumentDate?: string
  instrumentNumber?: string
  accountNumber?: string
}

export type Option = {
  label: string
  value: string
  helpText?: string
}

export type ExportedDocument = {
  fileContents: string
  contentType: string
  fileDownloadName: string
  lastModified: unknown
  entityTag: unknown
  enableRangeProcessing: boolean
}

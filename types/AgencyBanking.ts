import { Customer } from './Customer'

export type Agent = {
  id: string
  accountType: string
  name: string
  subsidiary: string
  status: string
  createdAt: string
  subAgents: number
  identificationType: string
  mobileNumber: string
  active: boolean
  accounts: MerchantAcount[]
  certificates: Document[]
  otherDocuments: Document[]
  logo: string
}

export type Document = {
  agentId?: number
  agentDocumentTypeId: number
  agentDocumentReference?: string
  documentContent: unknown
  createdWhen?: string
}

export type MerchantAcount = {
  accountType: string
  accountNumber: string
}

export type OutletUserPayload = {
  contractId: number
  outletCode: string
  name: string
  idNumber: string
  msisdn: string
  outletStatusId: number
  status: string
  reason: string
}

export type AgentPayload = {
  agentName?: string
  externalId?: string
  parentAgentId?: unknown
  agentCode?: string
  agentAccounts?: AgentAccount[]
  agentStatusId?: number
  logo?: string
  agentDocuments?: Document[]
  agentTypeId?: number
  msisdn?: string
  branchId?: number
  idNumber?: string
  agentId?: number
  reason?: string
  agencyPOSMachine?: string
  agencyRegion?: string
  agencyManagerPhone?: string
  agencyBranch?: string
  agencyTerritory?: string
  agencySector?: string
  agencyManagerName?: string
  agencyProvince?: string
  agencyCommune?: string
  agencyBuilding?: string
  agencyStreet?: string
  outletUsers?: OutletUser[]
  clientDetails?: Customer
  latitude?: string
  longitude?: string
  parentAgent?: string
  createdBy?: string
}

export type AgentAccount = {
  currency: string
  accountNumber: string
  agentAccountTypeId: number
}

export type OutletUser = {
  contractId: number
  outletCode: string
  name: string
  idNumber: string
  msisdn: string
  outletStatusId: number
  status: string
  userId?: string
  txUSD?: string
  txCDF?: string
  createdWhen?: string
}

export type AgentAgreement = {
  fileContents: string
  contentType: string
  fileDownloadName: string
  lastModified: unknown
  entityTag: unknown
  enableRangeProcessing: boolean
}

export type VerifyOutletUserPayload = {
  agentId?: string
  approvalStatus: number
  outletUser: OutletUser
}

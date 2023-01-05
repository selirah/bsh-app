import { FileError } from 'react-dropzone'
import { Option } from './Common'
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

export type AgentPayload = {
  agentName?: string
  externalId?: string
  parentAgentId?: number
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
  contractId?: number
  outletCode?: string
  name?: string
  idNumber?: string
  msisdn?: string
  outletStatusId?: number
  status?: string
  userId?: string
  txUSD?: string
  txCDF?: string
  createdWhen?: string
  reason?: string
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
  agentId?: number
  approvalStatus: number
  outletUser: OutletUser
}

export type AgentObject = {
  agentId: number
  agentName: string
  externalId: string
  parentAgentId: any
  msisdn: string
  agentCode: string
  logo: string
  agentTypeId: number
  agentType: string
  agentStatusId: number
  agentStatus: string
  branchId: number
  idNumber: string
  createdWhen: string
  lastModifiedWhen: string
  agentDocuments: Document[]
  agentAccounts: AgentAccount[]
  reason: string
  agencyPOSMachine: string
  agencyRegion: string
  agencyManagerPhone: string
  agencyBranch: string
  agencyTerritory: string
  agencySector: string
  agencyManagerName: string
  agencyProvince: string
  agencyCommune: string
  agencyStreet: string
  agencyBuilding: string
  latitude: string
  longitude: string
  outletUser: OutletUser[]
  parentAgentType: string
}

export type AgentResponse = {
  data: AgentObject[]
  totalRecords: number
  sorted: {
    by: string
    order: string
  }
  page: {
    number: number
    size: number
  }
}

export enum StatusTypes {
  ACTIVE = 'ACTIVE',
  REJECTED = 'REJECTED',
  DORMANT = 'DORMANT',
  BLOCKED = 'BLOCKED',
  PENDINGBLOCK = 'PENDINGBLOCK',
  PENDINGVERIFICATION = 'PENDINGVERIFICATION',
  PENDINGEDIT = 'PENDINGEDIT',
  REVERTED = 'REVERTED'
}

export enum AgentTypes {
  MASTERAGENT = 'MASTER AGENT',
  SUBAGENT = 'SUB AGENT',
  OUTLET = 'OUTLET',
  ORDINARYAGENT = 'ORDINARY AGENT',
  MERCHANT = 'MERCHANT'
}

export type UploadableFile = {
  file: File
  errors: FileError[]
}

export type AgentFormValues = {
  usdCommissionAccount?: Option
  cdfCommissionAccount?: Option
  agentName?: string
  branch?: Option
  agentLogo?: UploadableFile[]
  businessCertificate?: UploadableFile[]
  scannedDocuments?: UploadableFile[]
  otherDocuments?: UploadableFile[]
  phoneNumber?: string
  agentCode?: string
  usdTradingAccount?: Option
  cdfTradingAccount?: Option
  agencyManagerPhone?: string
  agencyRegion?: string
  agencyPOSMachine?: boolean
  agencyTerritory?: string
  agencySector?: string
  agencyManagerName?: string
  agencyProvince?: string
  agencyCommune?: string
  agencyStreet?: string
  agencyBuilding?: string
  latitude?: string
  reason?: string
  action?: string
}

export enum SchemeCodes {
  CA233 = 'CA233',
  CA234 = 'CA234',
  CA213 = 'CA213',
  CA268 = 'CA268'
}

export type AgencyBankingFilterValues = {
  branches?: Option[]
  agentTypes?: Option[]
  agentStatus?: Option[]
  keyword?: string
  agentId?: number
}

export type OutletUserResponse = {
  data: OutletUser[]
  totalRecords: number
  sorted: {
    by: string
    order: string
  }
  page: {
    number: number
    size: number
  }
}

export enum UserStatusTypes {
  NEW = 'NEW',
  BLOCKED = 'BLOCKED',
  RESET = 'RESET',
  ACTIVE = 'ACTIVE',
  PENDINGBLOCK = 'PENDINGBLOCK',
  PENDINGACTIVATION = 'PENDINGACTIVATION',
  PENDINGRESET = 'PENDINGRESET',
  PENDINGUNBLOCK = 'PENDINGUNBLOCK',
  RESTRICTEDAGENT = 'RESTRICTEDAGENT'
}

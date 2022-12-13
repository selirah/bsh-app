import { useQuery, QueryFunctionContext, useMutation } from 'react-query'
import { adminRequest } from 'utils/axios'
import {
  onError,
  onSuccess,
  FilterPayload,
  OutletUserPayload,
  AgentPayload,
  VerifyOutletUserPayload
} from 'types'

const endPoints = {
  fetchAgentAccountTypes: process.env.NEXT_PUBLIC_GET_ACCOUNT_TYPES ?? '',
  fetchAgentStatus: process.env.NEXT_PUBLIC_GET_AGENCY_STATUS ?? '',
  fetchOutletStatus: process.env.NEXT_PUBLIC_GET_OUTLET_USER_STATUS ?? '',
  fetchAgentDocumentTypes: process.env.NEXT_PUBLIC_GET_DOC_TYPES ?? '',
  fetchAllAgents: process.env.NEXT_PUBLIC_GET_AGENCIES ?? '',
  fetchOutletUsers: process.env.NEXT_PUBLIC_GET_OUTLET_USERS ?? '',
  blockOutletUser: process.env.NEXT_PUBLIC_BLOCK_OUTLET_USER ?? '',
  unblockOutletUser: process.env.NEXT_PUBLIC_UNBLOCK_OUTLET_USER ?? '',
  resetOutletUserPin: process.env.NEXT_PUBLIC_RESET_OUTLET_USER_PIN ?? '',
  searchAgentByCode: process.env.NEXT_PUBLIC_SEARCH_AGENT_BY_CODE ?? '',
  onboardAgent: process.env.NEXT_PUBLIC_ONBOARD_AGENT ?? '',
  createOutletUser: process.env.NEXT_PUBLIC_ADD_OUTLET_USER ?? '',
  verifyAgent: process.env.NEXT_PUBLIC_ONBOARD_AGENT ?? '',
  validateAgent: process.env.NEXT_PUBLIC_VALIDATE_AGENT ?? '',
  rejectAgentPermanent: process.env.NEXT_PUBLIC_ONBOARD_AGENT ?? '',
  rejectAgentWithReason: process.env.NEXT_PUBLIC_ONBOARD_AGENT ?? '',
  blockAgent: process.env.NEXT_PUBLIC_ONBOARD_AGENT ?? '',
  unblockAgent: process.env.NEXT_PUBLIC_ONBOARD_AGENT ?? '',
  fetchOfferLetter: process.env.NEXT_PUBLIC_GET_AGENT_CONTRACT_AGREEMENT ?? '',
  resetAgentPin: process.env.NEXT_PUBLIC_RESET_AGENT_PIN ?? '',
  selfServiceOnboarding: process.env.NEXT_PUBLIC_REGISTER_AGENT_ONLINE ?? '',
  exportAgents: process.env.NEXT_PUBLIC_EXPORT_AGENTS ?? '',
  fetchAgentsReport: process.env.NEXT_PUBLIC_GET_AGENCY_REPORTS ?? '',
  exportAgentsReport: process.env.NEXT_PUBLIC_EXPORT_AGENCY_REPORTS ?? '',
  verifyOutletUserStatus: process.env.NEXT_PUBLIC_VERIFY_OUTLET_USER_STATUS ?? '',
  rejectOutletUserStatus: process.env.NEXT_PUBLIC_VERIFY_OUTLET_USER_STATUS ?? '',
  fetchAllOutletUsers: process.env.NEXT_PUBLIC_GET_ALL_OUTLET_USERS ?? ''
}

const fetchAgentAccountTypes = () => {
  return adminRequest({
    url: endPoints.fetchAgentAccountTypes,
    method: 'get'
  })
}

export const useFetchAgentAccountTypes = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('agent-account-types', fetchAgentAccountTypes, { onSuccess, onError })
}

const fetchAgentStatus = () => {
  return adminRequest({
    url: endPoints.fetchAgentStatus,
    method: 'get'
  })
}

export const useFetchAgentStatus = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('agent-status', fetchAgentStatus, { onSuccess, onError })
}

const fetchOutletStatus = () => {
  return adminRequest({
    url: endPoints.fetchOutletStatus,
    method: 'get'
  })
}

export const useFetchOutletStatus = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('outlet-status', fetchOutletStatus, { onSuccess, onError })
}

const fetchAgentDocumentTypes = () => {
  return adminRequest({
    url: endPoints.fetchAgentDocumentTypes,
    method: 'get'
  })
}

export const useFetchAgentDocumentTypes = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('agent-document-types', fetchAgentDocumentTypes, { onSuccess, onError })
}

const fetchAllAgents = ({ queryKey }: QueryFunctionContext<[string, FilterPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: endPoints.fetchAllAgents,
    method: 'post',
    data: payload
  })
}

export const useFetchAllAgents = (
  payload: FilterPayload,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['agents', payload], fetchAllAgents, { onSuccess, onError })
}

const fetchOutletUsers = ({ queryKey }: QueryFunctionContext<[string, FilterPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: endPoints.fetchAllAgents,
    method: 'post',
    data: payload
  })
}

export const useFetchOutletUsers = (
  payload: FilterPayload,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['outlet-users', payload], fetchOutletUsers, { onSuccess, onError })
}

const blockOutletUser = (payload: OutletUserPayload) => {
  return adminRequest({ url: endPoints.blockOutletUser, method: 'post', data: payload })
}

export const useBlockOutletUser = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(blockOutletUser, {
    onSuccess,
    onError
  })
}

const unblockOutletUser = (payload: OutletUserPayload) => {
  return adminRequest({ url: endPoints.unblockOutletUser, method: 'post', data: payload })
}

export const useUnblockOutletUser = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(unblockOutletUser, {
    onSuccess,
    onError
  })
}

const resetOutletUserPin = (payload: OutletUserPayload) => {
  return adminRequest({ url: endPoints.resetOutletUserPin, method: 'post', data: payload })
}

export const useResetOutletUserPin = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(resetOutletUserPin, {
    onSuccess,
    onError
  })
}

const searchAgentByCode = ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const agentCode = queryKey[1]
  return adminRequest({
    url: `${endPoints.searchAgentByCode}?agentCode=${agentCode}`,
    method: 'get'
  })
}

export const useSearchAgentByCode = (
  agentCode: string,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['agent', agentCode], searchAgentByCode, {
    onSuccess,
    onError
  })
}

const onboardAgent = (payload: AgentPayload) => {
  return adminRequest({ url: endPoints.onboardAgent, method: 'post', data: payload })
}

export const useOnboardAgent = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(onboardAgent, {
    onSuccess,
    onError
  })
}

const createOutletUser = (payload: AgentPayload) => {
  return adminRequest({ url: endPoints.createOutletUser, method: 'post', data: payload })
}

export const useCreateOutletUser = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(createOutletUser, {
    onSuccess,
    onError
  })
}

const verifyAgent = (payload: AgentPayload) => {
  return adminRequest({ url: endPoints.verifyAgent, method: 'post', data: payload })
}

export const useVerifyAgent = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(verifyAgent, {
    onSuccess,
    onError
  })
}

const validateAgent = (payload: AgentPayload) => {
  return adminRequest({ url: endPoints.validateAgent, method: 'post', data: payload })
}

export const useValidateAgent = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(validateAgent, {
    onSuccess,
    onError
  })
}

const rejectAgentPermanent = (payload: AgentPayload) => {
  return adminRequest({ url: endPoints.rejectAgentPermanent, method: 'post', data: payload })
}

export const useRejectAgentPermanent = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(rejectAgentPermanent, {
    onSuccess,
    onError
  })
}

const rejectAgentWithReason = (payload: AgentPayload) => {
  return adminRequest({ url: endPoints.rejectAgentWithReason, method: 'post', data: payload })
}

export const useRejectAgentWithReason = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(rejectAgentWithReason, {
    onSuccess,
    onError
  })
}

const blockAgent = (payload: AgentPayload) => {
  return adminRequest({ url: endPoints.blockAgent, method: 'post', data: payload })
}

export const useBlockAgent = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(blockAgent, {
    onSuccess,
    onError
  })
}

const unblockAgent = (payload: AgentPayload) => {
  return adminRequest({ url: endPoints.unblockAgent, method: 'post', data: payload })
}

export const useUnblockAgent = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(unblockAgent, {
    onSuccess,
    onError
  })
}

const fetchOfferLetter = ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const agentCode = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchOfferLetter}?agentCode=${agentCode}`,
    method: 'get'
  })
}

export const useFetchOfferLetter = (
  agentCode: string,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['offer-letter', agentCode], fetchOfferLetter, {
    onSuccess,
    onError
  })
}

const resetAgentPin = (payload: AgentPayload) => {
  return adminRequest({ url: endPoints.resetAgentPin, method: 'post', data: payload })
}

export const useResetAgentPin = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(resetAgentPin, {
    onSuccess,
    onError
  })
}

const selfServiceOnboarding = (payload: AgentPayload) => {
  return adminRequest({ url: endPoints.selfServiceOnboarding, method: 'post', data: payload })
}

export const useSelfServiceOnboarding = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(selfServiceOnboarding, {
    onSuccess,
    onError
  })
}

const exportAgents = ({ queryKey }: QueryFunctionContext<[string, FilterPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: endPoints.exportAgents,
    method: 'post',
    data: payload
  })
}

export const useExportAgents = (
  payload: FilterPayload,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['exported-agents', payload], exportAgents, {
    onSuccess,
    onError
  })
}

const fetchAgentsReport = ({ queryKey }: QueryFunctionContext<[string, FilterPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: endPoints.fetchAgentsReport,
    method: 'post',
    data: payload
  })
}

export const useFetchAgentsReport = (
  payload: FilterPayload,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['agents-reports', payload], fetchAgentsReport, {
    onSuccess,
    onError
  })
}

const exportAgentsReport = ({ queryKey }: QueryFunctionContext<[string, FilterPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: endPoints.exportAgentsReport,
    method: 'post',
    data: payload
  })
}

export const useExportAgentsReport = (
  payload: FilterPayload,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['exported-agents-reports', payload], exportAgentsReport, {
    onSuccess,
    onError
  })
}

const verifyOutletUserStatus = (payload: VerifyOutletUserPayload) => {
  return adminRequest({
    url: `${endPoints.verifyOutletUserStatus}?approvalStatus=${payload.approvalStatus}&agentId=${payload.agentId}`,
    method: 'post',
    data: payload
  })
}

export const useVerifyOutletUserStatus = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(verifyOutletUserStatus, {
    onSuccess,
    onError
  })
}

const rejectOutletUserStatus = (payload: VerifyOutletUserPayload) => {
  return adminRequest({
    url: `${endPoints.rejectOutletUserStatus}?approvalStatus=${payload.approvalStatus}&agentId=${payload.agentId}`,
    method: 'post',
    data: payload
  })
}

export const useRejectOutletUserStatus = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(rejectOutletUserStatus, {
    onSuccess,
    onError
  })
}

const fetchAllOutletUsers = ({ queryKey }: QueryFunctionContext<[string, FilterPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: endPoints.fetchAllOutletUsers,
    method: 'post',
    data: payload
  })
}

export const useFetchAllOutletUsers = (
  payload: FilterPayload,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['outlet-users', payload], fetchAllOutletUsers, {
    onSuccess,
    onError
  })
}

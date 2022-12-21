import { useQuery, QueryFunctionContext, useMutation } from 'react-query'
import { adminRequest } from 'utils/axios'
import {
  CurrencyPairPayload,
  CashboxPayload,
  onError,
  onSuccess,
  DenominationTxPayload,
  CheckStatusPayload
} from 'types'

const endPoints = {
  fetchBranches: process.env.NEXT_PUBLIC_GET_BANK_BRANCHES ?? '',
  fetchCountries: process.env.NEXT_PUBLIC_GET_COUNTRIES ?? '',
  fetchStates: process.env.NEXT_PUBLIC_GET_STATES ?? '',
  fetchStatesFinacle: process.env.NEXT_PUBLIC_GET_STATES_FINACLE ?? '',
  fetchCities: process.env.NEXT_PUBLIC_GET_CITIES ?? '',
  fetchCommunes: process.env.NEXT_PUBLIC_GET_COMMUNES ?? '',
  fetchCurrencyPair: process.env.NEXT_PUBLIC_GET_CURRENCY_PAIR ?? '',
  fetchCashbox: process.env.NEXT_PUBLIC_GET_CASHBOX_ACCOUNT_DETAILS ?? '',
  fetchDenominations: process.env.NEXT_PUBLIC_GET_DENOMINATIONS ?? '',
  fetchDocuments: process.env.NEXT_PUBLIC_GET_DOCUMENTS ?? '',
  postDenominationsTx: process.env.NEXT_PUBLIC_POST_DENOMINATIONS_TRX ?? '',
  fetchChequeStatus: process.env.NEXT_PUBLIC_GET_CHEQUE_STATUS ?? '',
  fetchNationalities: process.env.NEXT_PUBLIC_GET_NATIONALITIES ?? '',
  fetchAccountTypes: process.env.NEXT_PUBLIC_GET_CUSTOMER_ACCOUNT_TYPES ?? '',
  fetchCurrencies: process.env.NEXT_PUBLIC_GET_CURRENCIES ?? '',
  fetchProfessions: process.env.NEXT_PUBLIC_GET_PROFESSIONS ?? '',
  fetchDocumentTypes: process.env.NEXT_PUBLIC_GET_DOCUMENT_TYPES ?? '',
  fetchMaritalStatus: process.env.NEXT_PUBLIC_GET_MARITAL_STATUSES ?? '',
  fetchGenders: process.env.NEXT_PUBLIC_GET_GENDERS ?? '',
  fetchLanguages: process.env.NEXT_PUBLIC_GET_LANGUAGES ?? '',
  fetchTitles: process.env.NEXT_PUBLIC_GET_TITLES ?? '',
  fetchRegions: process.env.NEXT_PUBLIC_GET_REGIONS ?? '',
  fetchIssuerOrganizations: process.env.NEXT_PUBLIC_GET_ISSUER_ORGANIZATIONS ?? ''
}

const fetchBranches = () => {
  return adminRequest({
    url: endPoints.fetchBranches,
    method: 'get'
  })
}

export const useFetchBranches = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('branches', fetchBranches, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchCountries = () => {
  return adminRequest({
    url: endPoints.fetchCountries,
    method: 'get'
  })
}

export const useFetchCountries = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('countries', fetchCountries, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchStates = () => {
  return adminRequest({
    url: endPoints.fetchStates,
    method: 'get'
  })
}

export const useFetchStates = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('states', fetchStates, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchFinacleStates = () => {
  return adminRequest({
    url: endPoints.fetchStatesFinacle,
    method: 'get'
  })
}

export const useFetchFinacleStates = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('finacle-states', fetchFinacleStates, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchCities = () => {
  return adminRequest({
    url: endPoints.fetchCities,
    method: 'get'
  })
}

export const useFetchCities = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('cities', fetchCities, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchCommunes = () => {
  return adminRequest({
    url: endPoints.fetchCommunes,
    method: 'get'
  })
}

export const useFetchCommunes = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('communes', fetchCommunes, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchCurrencyPair = ({ queryKey }: QueryFunctionContext<[string, CurrencyPairPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchCurrencyPair}?currencyFrom=${payload.currencyFrom}&currencyTo=${payload.currencyTo}`,
    method: 'get'
  })
}

export const useFetchCurrencyPair = (
  payload: CurrencyPairPayload,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['currency-pair', payload], fetchCurrencyPair, { onSuccess, onError })
}

const fetchCashbox = ({ queryKey }: QueryFunctionContext<[string, CashboxPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchCashbox}?externalUserId=${payload.externalUserId}&externalBranchId=${payload.externalBranchId}&currency=${payload.currency}`,
    method: 'get'
  })
}

export const useFetchCashbox = (
  payload: CashboxPayload,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['cashbox', payload], fetchCashbox, {
    onSuccess: onSuccess,
    onError: onError
  })
}

const fetchDenominations = ({ queryKey }: QueryFunctionContext<[string, CashboxPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchDenominations}?externalUserId=${payload.externalUserId}&externalBranchId=${payload.externalBranchId}&currency=${payload.currency}`,
    method: 'get'
  })
}

export const useFetchDenominations = (
  payload: CashboxPayload,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['denominations', payload], fetchDenominations, {
    onSuccess: onSuccess,
    onError: onError,
    refetchOnWindowFocus: false
  })
}

const fetchDocuments = ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const fileKey = queryKey[1]
  return adminRequest({ url: `${endPoints.fetchDocuments}?fileKey=${fileKey}`, method: 'get' })
}

export const useFetchDocuments = (fileKey: string, onSuccess?: onSuccess, onError?: onError) => {
  return useQuery(['documents', fileKey], fetchDocuments, {
    onSuccess: onSuccess,
    onError: onError
  })
}

const postDenominationsTx = (payload: DenominationTxPayload) => {
  return adminRequest({ url: endPoints.postDenominationsTx, method: 'post', data: payload })
}

export const usePostDenominationTx = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(postDenominationsTx, {
    onSuccess,
    onError
  })
}

const fetchChequeStatus = ({ queryKey }: QueryFunctionContext<[string, CheckStatusPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchChequeStatus}?instrumentDate=${payload.instrumentDate}&instrumentNumber=${payload.instrumentNumber}&accountNumber=${payload.accountNumber}`,
    method: 'get'
  })
}

export const useFetchChequeStatus = (
  payload: CheckStatusPayload,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['check-status', payload], fetchChequeStatus, {
    onSuccess,
    onError
  })
}

const fetchNationalities = () => {
  return adminRequest({
    url: endPoints.fetchNationalities,
    method: 'get'
  })
}

export const useFetchNationalities = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('nationalities', fetchNationalities, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchAccountTypes = ({ queryKey }: QueryFunctionContext<[string, boolean]>) => {
  const isStaff = queryKey[1]
  return adminRequest({
    url: isStaff ? `${endPoints.fetchAccountTypes}?isStaff=1` : endPoints.fetchAccountTypes,
    method: 'get'
  })
}

export const useFetchAccountTypes = (
  isStaff?: boolean,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['account-types', isStaff], fetchAccountTypes, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchCurrencies = () => {
  return adminRequest({
    url: endPoints.fetchCurrencies,
    method: 'get'
  })
}

export const useFetchCurrencies = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('currencies', fetchCurrencies, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchProfessions = () => {
  return adminRequest({
    url: endPoints.fetchProfessions,
    method: 'get'
  })
}

export const useFetchProfessions = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('professions', fetchProfessions, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchDocumentTypes = () => {
  return adminRequest({
    url: endPoints.fetchDocumentTypes,
    method: 'get'
  })
}

export const useFetchDocumentTypes = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('document-types', fetchDocumentTypes, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchMaritalStatus = () => {
  return adminRequest({
    url: endPoints.fetchMaritalStatus,
    method: 'get'
  })
}

export const useFetchMaritalStatus = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('marital-status', fetchMaritalStatus, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchGenders = () => {
  return adminRequest({
    url: endPoints.fetchGenders,
    method: 'get'
  })
}

export const useFetchGenders = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('genders', fetchGenders, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchLanguages = () => {
  return adminRequest({
    url: endPoints.fetchLanguages,
    method: 'get'
  })
}

export const useFetchLanguages = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('languages', fetchLanguages, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchTitles = () => {
  return adminRequest({
    url: endPoints.fetchTitles,
    method: 'get'
  })
}

export const useFetchTitles = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('titles', fetchTitles, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchRegions = () => {
  return adminRequest({
    url: endPoints.fetchRegions,
    method: 'get'
  })
}

export const useFetchRegions = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('regions', fetchRegions, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchIssuerOrganizations = () => {
  return adminRequest({
    url: endPoints.fetchIssuerOrganizations,
    method: 'get'
  })
}

export const useFetchIssuerOrganizations = (onSuccess?: onSuccess, onError?: onError) => {
  return useQuery('issuer-organizations', fetchIssuerOrganizations, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

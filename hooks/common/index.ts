import { useQuery, QueryFunctionContext, useMutation } from 'react-query'
import { adminRequest } from 'utils/axios'
import {
  Branch,
  Classifier,
  CurrencyPair,
  CurrencyPairPayload,
  Cashbox,
  CashboxPayload,
  Denomination,
  onError,
  onSuccess,
  DenominationTxPayload,
  CheckStatusPayload,
  SuccessResponse
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
  fetchCheckStatus: process.env.NEXT_PUBLIC_GET_CHEQUE_STATUS ?? ''
}

const fetchBranches = () => {
  return adminRequest({
    url: endPoints.fetchBranches,
    method: 'get'
  })
}

export const useFetchBranches = () => {
  return useQuery<unknown, unknown, Branch[]>('branches', fetchBranches)
}

const fetchCountries = () => {
  return adminRequest({
    url: endPoints.fetchCountries,
    method: 'get'
  })
}

export const useFetchCountries = () => {
  return useQuery<unknown, unknown, Classifier[]>('countries', fetchCountries)
}

const fetchStates = () => {
  return adminRequest({
    url: endPoints.fetchStates,
    method: 'get'
  })
}

export const useFetchStates = () => {
  return useQuery<unknown, unknown, Classifier[]>('states', fetchStates)
}

const fetchFinacleStates = () => {
  return adminRequest({
    url: endPoints.fetchStatesFinacle,
    method: 'get'
  })
}

export const useFetchFinacleStates = () => {
  return useQuery<unknown, unknown, Classifier[]>('finacle-states', fetchFinacleStates)
}

const fetchCities = () => {
  return adminRequest({
    url: endPoints.fetchCities,
    method: 'get'
  })
}

export const useFetchCities = () => {
  return useQuery<unknown, unknown, Classifier[]>('cities', fetchCities)
}

const fetchCommunes = () => {
  return adminRequest({
    url: endPoints.fetchCommunes,
    method: 'get'
  })
}

export const useFetchCommunes = () => {
  return useQuery<unknown, unknown, Classifier[]>('communes', fetchCommunes)
}

const fetchCurrencyPair = ({ queryKey }: QueryFunctionContext<[string, CurrencyPairPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchCurrencyPair}?currencyFrom=${payload.currencyFrom}&currencyTo=${payload.currencyTo}`,
    method: 'get'
  })
}

export const useFetchCurrencyPair = (payload: CurrencyPairPayload) => {
  return useQuery<unknown, unknown, CurrencyPair>(['currency-pair', payload], fetchCurrencyPair)
}

const fetchCashbox = ({ queryKey }: QueryFunctionContext<[string, CashboxPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchCashbox}?externalUserId=${payload.externalUserId}&externalBranchId=${payload.externalBranchId}&currency=${payload.currency}`,
    method: 'get'
  })
}

export const useFetchCashbox = (payload: CashboxPayload) => {
  return useQuery<unknown, unknown, Cashbox>(['cashbox', payload], fetchCashbox)
}

const fetchDenominations = ({ queryKey }: QueryFunctionContext<[string, CashboxPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchDenominations}?externalUserId=${payload.externalUserId}&externalBranchId=${payload.externalBranchId}&currency=${payload.currency}`,
    method: 'get'
  })
}

export const useFetchDenominations = (payload: CashboxPayload) => {
  return useQuery<unknown, unknown, Denomination[]>(['denominations', payload], fetchDenominations)
}

const fetchDocuments = ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const fileKey = queryKey[1]
  return adminRequest({ url: `${endPoints.fetchDocuments}?fileKey=${fileKey}`, method: 'get' })
}

export const useFetchDocuments = (fileKey: string) => {
  return useQuery<unknown, unknown, { file: string }>(['documents', fileKey], fetchDocuments)
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

const fetchCheckStatus = ({ queryKey }: QueryFunctionContext<[string, CheckStatusPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchCheckStatus}?instrumentDate=${payload.instrumentDate}&instrumentNumber=${payload.instrumentNumber}&accountNumber=${payload.accountNumber}`,
    method: 'get'
  })
}

export const useFetchCheckStatus = (payload: CheckStatusPayload) => {
  return useQuery<unknown, unknown, SuccessResponse>(['check-status', payload], fetchCheckStatus)
}

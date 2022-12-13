import { useQuery, QueryFunctionContext } from 'react-query'
import { adminRequest } from 'utils/axios'
import { CustomerSearchPayload, CustomerBiometricPayload, onError, onSuccess } from 'types'
import { getSession } from 'next-auth/react'

const endPoints = {
  searchCustomer: process.env.NEXT_PUBLIC_SEARCH_CUSTOMER ?? '',
  fetchCustomerBiometrics: process.env.NEXT_PUBLIC_SEARCH_CUSTOMER_BIOMETRICS ?? '',
  fetchCustomerJoinAccount: process.env.NEXT_PUBLIC_GET_CUSTOMER_JOINT_ACCOUNT ?? '',
  fetchCustomer: process.env.NEXT_PUBLIC_GET_ISSUER_ORGANIZATIONS ?? ''
}

const searchCustomer = async ({
  queryKey
}: QueryFunctionContext<[string, CustomerSearchPayload]>) => {
  const payload = queryKey[1]
  const userSession = await getSession()
  const { user } = userSession
  return adminRequest({
    url: `${endPoints.searchCustomer}?searchProperty=${payload.searchProperty}&propertyData=${payload.propertyData}&userId=${user.userId}`,
    method: 'get'
  })
}

export const useSearchCustomer = (
  payload: CustomerSearchPayload,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['customer-data', payload], searchCustomer, {
    onSuccess,
    onError
  })
}

const fetchCustomerBiometrics = ({
  queryKey
}: QueryFunctionContext<[string, CustomerBiometricPayload]>) => {
  const payload = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchCustomerBiometrics}?accountId=${payload.accountId}&customerId=${payload.customerID}`,
    method: 'get'
  })
}

export const useFetchCustomerBiometrics = (
  payload: CustomerBiometricPayload,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['customer-biometrics', payload], fetchCustomerBiometrics, { onSuccess, onError })
}

const fetchCustomerJoinAccount = ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const accountNumber = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchCustomerJoinAccount}?accNum=${accountNumber}`,
    method: 'get'
  })
}

export const useFetchCustomerJointAccount = (
  accountNumber: string,
  onSuccess?: onSuccess,
  onError?: onError
) => {
  return useQuery(['customer-joint-accounts', accountNumber], fetchCustomerJoinAccount, {
    onSuccess,
    onError
  })
}

const fetchCustomer = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const customerId = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchCustomer}?customerId=${customerId}`,
    method: 'get'
  })
}

export const useFetchCustomer = (customerId: string, onSuccess?: onSuccess, onError?: onError) => {
  return useQuery(['customer-data', customerId], fetchCustomer, {
    onSuccess,
    onError
  })
}

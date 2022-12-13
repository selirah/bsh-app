import { useQuery, QueryFunctionContext } from 'react-query'
import { adminRequest } from 'utils/axios'
import {
  CustomerSearchPayload,
  CustomerBiometricPayload,
  Customer,
  CustomerBiometric,
  CustomerJointAccount
} from 'types'
import { getSession } from 'next-auth/react'

const endPoints = {
  fetchCustomer: process.env.NEXT_PUBLIC_SEARCH_CUSTOMER ?? '',
  fetchCustomerBiometrics: process.env.NEXT_PUBLIC_SEARCH_CUSTOMER_BIOMETRICS ?? '',
  fetchCustomerJoinAccount: process.env.NEXT_PUBLIC_GET_CUSTOMER_JOINT_ACCOUNT ?? ''
}

const fetchCustomer = async ({
  queryKey
}: QueryFunctionContext<[string, CustomerSearchPayload]>) => {
  const payload = queryKey[1]
  const userSession = await getSession()
  const { user } = userSession
  return adminRequest({
    url: `${endPoints.fetchCustomer}?searchProperty=${payload.searchProperty}&propertyData=${payload.propertyData}&userId=${user.userId}`,
    method: 'get'
  })
}

export const useFetchCustomerData = (payload: CustomerSearchPayload) => {
  return useQuery<unknown, unknown, Customer>(['customer-data', payload], fetchCustomer)
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

export const useFetchCustomerBiometrics = (payload: CustomerBiometricPayload) => {
  return useQuery<unknown, unknown, CustomerBiometric[]>(
    ['customer-biometrics', payload],
    fetchCustomerBiometrics
  )
}

const fetchCustomerJoinAccount = ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const accountNumber = queryKey[1]
  return adminRequest({
    url: `${endPoints.fetchCustomerJoinAccount}?accNum=${accountNumber}`,
    method: 'get'
  })
}

export const useFetchCustomerJointAccount = (accountNumber: string) => {
  return useQuery<unknown, unknown, CustomerJointAccount>(
    ['customer-joint-accounts', accountNumber],
    fetchCustomerJoinAccount
  )
}

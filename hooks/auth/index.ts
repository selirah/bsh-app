import { useMutation } from 'react-query'
import { authRequest } from 'utils/axios'
import { LoginSchema } from 'schema/Auth'
import { AxiosError, AxiosResponse } from 'axios'

const endPoints = {
  login: process.env.NEXT_PUBLIC_LOGIN
}

const loginUser = (payload: LoginSchema) => {
  return authRequest({ url: endPoints.login, method: 'post', data: { data: payload } })
}

type onSuccess = (response: AxiosResponse) => void
type onError = (response: AxiosError) => void

export const useLogin = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(loginUser, {
    onSuccess,
    onError
  })
}

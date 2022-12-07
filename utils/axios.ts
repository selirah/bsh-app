import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

const adminInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`
})
const authInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_USERSERVICE_URL}/api`
})

export type AxiosOptions = {
  url: string
  method: 'post' | 'get'
  data?: unknown
}

export const adminRequest = async ({ ...options }: AxiosOptions) => {
  adminInstance.defaults.headers.common['Authorization'] = `Bearer token`
  adminInstance.defaults.headers.post['Content-Type'] = 'application/json'

  const onSuccess = (response: AxiosResponse) => response
  const onError = (error: AxiosError) => {
    // optionaly catch errors and add additional logging here
    return error
  }
  try {
    const response = await adminInstance(options)
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}

export const authRequest = async ({ ...options }: AxiosOptions) => {
  authInstance.defaults.headers.common['Authorization'] = `Bearer token`
  authInstance.defaults.headers.post['Content-Type'] = 'application/json'

  const onSuccess = (response: AxiosResponse) => response
  const onError = (error: unknown) => {
    // optionaly catch errors and add additional logging here
    return error as AxiosError
  }
  try {
    const response = await authInstance(options)
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

const instance: AxiosInstance = axios.create({ baseURL: '' })

export type AxiosOptions = {
  url: string
  method: 'post' | 'get'
  data?: unknown
}

export const request = async ({ ...options }: AxiosOptions) => {
  instance.defaults.headers.common['Authorization'] = `Bearer token`
  instance.defaults.headers.post['Content-Type'] = 'application/json'

  const onSuccess = (response: AxiosResponse) => response
  const onError = (error: AxiosError) => {
    // optionaly catch errors and add additional logging here
    return error
  }
  try {
    const response = await instance(options)
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}

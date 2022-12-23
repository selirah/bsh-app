import axios, { AxiosInstance } from 'axios'
import { getSession } from 'next-auth/react'
import md5 from 'md5'

const adminInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`
})

const adminInstanceTest: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT_TEST}/api`
})

const authInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_USERSERVICE_URL}/api`
})

const bioDeviceInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BIOMETRIC_DEVICE_URL}`
})

export type AxiosOptions = {
  url: string
  method: 'post' | 'get'
  data?: unknown
  bearerToken?: string
}

export const adminRequest = async ({ ...options }: AxiosOptions) => {
  const userSession = await getSession()
  const { accessToken } = userSession
  adminInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  adminInstance.defaults.headers.post['Content-Type'] = 'application/json'

  if (options.data && options.method === 'post') {
    delete options.data['hash']
    const salt = 'PCES'
    options.data['poweredBy'] = salt
    const hash = md5(JSON.stringify(options.data))
    delete options.data['poweredBy']
    options.data['hash'] = hash
  }
  return await adminInstance(options)
}

export const authRequest = async ({ ...options }: AxiosOptions) => {
  authInstance.defaults.headers.common['Authorization'] = `Bearer ${options.bearerToken}`
  authInstance.defaults.headers.post['Content-Type'] = 'application/json'

  return await authInstance(options)
}

export const bioDeviceRequest = async ({ ...options }: AxiosOptions) => {
  bioDeviceInstance.defaults.headers.post['Content-Type'] = 'application/json'

  return await bioDeviceInstance(options)
}

export const adminRequestTest = async ({ ...options }: AxiosOptions) => {
  const userSession = await getSession()
  const { accessToken } = userSession
  adminInstanceTest.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  adminInstanceTest.defaults.headers.post['Content-Type'] = 'application/json'

  if (options.data && options.method === 'post') {
    delete options.data['hash']
    const salt = 'PCES'
    options.data['poweredBy'] = salt
    const hash = md5(JSON.stringify(options.data))
    delete options.data['poweredBy']
    options.data['hash'] = hash
  }
  return await adminInstanceTest(options)
}

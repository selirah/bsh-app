import { AxiosError, AxiosResponse } from 'axios'

export type SuccessResponse = AxiosResponse
export type ErrorResponse = AxiosError

export type onSuccess = (response: AxiosResponse) => void
export type onError = (response: AxiosError) => void

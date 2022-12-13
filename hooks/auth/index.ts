import { useMutation } from 'react-query'
import { authRequest, bioDeviceRequest } from 'utils/axios'
import {
  LoginSchema,
  RequestOtpSchema,
  OtpSchema,
  ForgottenPasswordSchema,
  ResetPasswordSchema,
  BioSchema
} from 'types/Auth'
import { onSuccess, onError } from 'types'

const endPoints = {
  login: process.env.NEXT_PUBLIC_LOGIN ?? '',
  requestOtp: process.env.NEXT_PUBLIC_REQUEST_OTP ?? '',
  validateOtp: process.env.NEXT_PUBLIC_VALIDATE_OTP ?? '',
  forgottenPassword: process.env.NEXT_PUBLIC_FORGOTTEN_PASSWORD ?? '',
  resetPassword: process.env.NEXT_PUBLIC_RESET_PASSWORD ?? '',
  bioDevice: process.env.NEXT_PUBLIC_BIO_INIT ?? '',
  validateBio: process.env.NEXT_PUBLIC_VALIDATE_BIO ?? ''
}

const loginUser = (payload: LoginSchema) => {
  return authRequest({ url: endPoints.login, method: 'post', data: { data: payload } })
}

export const useLogin = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(loginUser, {
    onSuccess,
    onError
  })
}

const requestOtp = (payload: RequestOtpSchema) => {
  return authRequest({
    url: endPoints.requestOtp,
    method: 'post',
    data: { data: payload },
    bearerToken: payload.limitedToken
  })
}

export const useRequestOtp = () => {
  return useMutation(requestOtp)
}

const validateOtp = (payload: OtpSchema) => {
  return authRequest({
    url: endPoints.validateOtp,
    method: 'post',
    data: { data: payload },
    bearerToken: payload.limitedToken
  })
}

export const useValidateOtp = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(validateOtp, {
    onSuccess,
    onError
  })
}

const forgottenPasswordRequest = (payload: ForgottenPasswordSchema) => {
  return authRequest({ url: endPoints.forgottenPassword, method: 'post', data: { data: payload } })
}

export const useForgottenPasswordRequest = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(forgottenPasswordRequest, {
    onSuccess,
    onError
  })
}

const resetPassword = (payload: ResetPasswordSchema) => {
  return authRequest({ url: endPoints.resetPassword, method: 'post', data: { data: payload } })
}

export const useResetPassword = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(resetPassword, {
    onSuccess,
    onError
  })
}

const requestBioInit = () => {
  return bioDeviceRequest({
    url: endPoints.bioDevice,
    method: 'post'
  })
}

export const useBioInit = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(requestBioInit, {
    onSuccess,
    onError
  })
}

const validateBio = (payload: BioSchema) => {
  return authRequest({
    url: endPoints.validateBio,
    method: 'post',
    data: { data: payload },
    bearerToken: payload.limitedToken
  })
}

export const useValidateBio = (onSuccess: onSuccess, onError: onError) => {
  return useMutation(validateBio, {
    onSuccess,
    onError
  })
}

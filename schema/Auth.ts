export type LoginSchema = {
  username: string
  password: string
  rememberMe?: boolean
}

export type UserDTO = {
  branchId: number
  businessUnitId: unknown
  email: string
  externalCustomerId: string
  externalBranchId: unknown
  externalUserId: string
  firstName: string
  fullName: string
  institutionId: number
  lastName: string
  primaryPhoneNo: string
  requires2StepVerification: boolean
  userGuid: string
  userId: number
  username: string
  scopes: string[]
  lastPasswordChange: string
}

export type LoginResponse = {
  userDTO: UserDTO
  authMode: 'OTP' | 'BIO'
}

export type OtpSchema = {
  otp: string
  username: string
  email: string
  limitedToken?: string
  authMode?: 'OTP' | 'BIO'
}

export type RequestOtpSchema = {
  username: string
  template: string
  limitedToken?: string
}

export type ForgottenPasswordSchema = {
  username: string
}

export type ForgottenPasswordResponse = {
  processId: string
}

export type ResetPasswordSchema = {
  username: string
  confirmPassword?: string
  password: string
  processId: string
}

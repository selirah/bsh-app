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

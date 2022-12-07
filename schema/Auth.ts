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

export type FingerPrintSchema = {
  position: string
  image: {
    format: string
    resolutionDpi: number
    data: string
  }
}

export type BioDeviceResponse = {
  ErrorCode: number
  Manufacturer: string
  Model: string
  SerialNumber: string
  ImageWidth: number
  ImageHeight: number
  ImageDPI: number
  ImageQuality: number
  NFIQ: number
  Attempts: number
  Result: number
  EnrollData?: {
    Templates: Template[]
  }
  SerHandle: number
  BMPBase64: string
}

export type Template = {
  fpos: string
  nfiq: number
  TemplateBase64: string
}

export type BioSchema = {
  reference?: string
  searchCriteria: {
    label: string
    value: string
  }
  fingerPrints?: FingerPrintSchema[]
  limitedToken?: string
}

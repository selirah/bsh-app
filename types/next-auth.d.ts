declare module 'next-auth' {
  interface Session {
    accessToken: string
    email: string
    expires: string
    name: string
    user: {
      branchId: number
      branchName: string
      businessUnitId: number
      email: string
      externalCustomerId: string
      externalBranchId: string
      externalUserId: string
      fullName: string
      institutionId: number
      isEnabled: boolean
      isLoggedIn: boolean
      lastLoginDate: string
      lastPasswordChange: string
      modifiedById: number
      password: string
      requires2StepVerification: boolean
      userId: number
      username: string
      scopes: string[]
    }
  }
}

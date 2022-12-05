import NextAuth, { NextAuthOptions } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import Credentials from 'next-auth/providers/credentials'
// import { validateBio, validateOTP } from 'middleware/auth'
// import { BioVerify, OTPVerify } from 'interfaces/Auth'

const providers = [
  Credentials({
    name: 'Broker2FA',
    credentials: {
      username: { label: 'Username/Email/Domain user', type: 'text' },
      password: { label: 'Enter password here', type: 'password' }
    },

    async authorize(credentials) {
      try {
        const credsPayload: any = credentials
        // const limitedToken = credsPayload.limitedToken
        const authMode = credsPayload.authMode

        if (authMode === 'OTP') {
          // const payload: OTPVerify = {
          //   email: credsPayload.email,
          //   otp: credsPayload.otp,
          //   username: credsPayload.username
          // }
          // const response = await validateOTP(payload, limitedToken)
          const response = null
          if (response && response.data) {
            if (response.headers['x-jwt-token']) {
              response.data.token = response.headers['x-jwt-token']
            }
            return response.data
          } else {
            return null
          }
        } else if (authMode === 'BIO') {
          // const payload: BioVerify = {
          //   fingerprints: JSON.parse(credsPayload.payload).fingerprints,
          //   searchCriteria: JSON.parse(credsPayload.payload).searchCriteria
          // }
          // const response = await validateBio(payload, limitedToken)
          const response = null
          if (response && response.data) {
            if (response.headers['x-jwt-token']) {
              response.data.token = response.headers['x-jwt-token']
            }
            return response.data
          } else {
            return null
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  })
]

const callbacks = {
  redirect({ baseUrl }: any) {
    return baseUrl
  },
  async signIn({ user }) {
    return user
  },
  async jwt({ token, user }: any) {
    if (user) {
      token.accessToken = user.token
      token.user = user
      token.email = user.email
      token.name = user.name
    }
    return token
  },
  async session({ session, token }) {
    session.accessToken = token.accessToken
    session.user = token.user
    session.email = token.email
    session.name = token.name
    return session
  }
}

const options: NextAuthOptions = {
  providers,
  callbacks,
  pages: {
    error: '/auth/error',
    signIn: '/auth/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60 // 30 minutes
  },
  jwt: {
    secret: '1g9BVIJWkrQkLUwTW67bjgDX7Abj3CX58RYZ5BOIUM4'
  },
  secret: '1g9BVIJWkrQkLUwTW67bjgDX7Abj3CX58RYZ5BOIUM4',
  debug: true
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)

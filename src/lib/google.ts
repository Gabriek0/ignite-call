import dayjs from 'dayjs'
import { google } from 'googleapis'
import { prisma } from './prisma'

export async function getGoogleOAuthToken(userId: string) {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      user_id: userId,
      provider: 'google',
    },
  })

  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })

  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : null,
  })

  if (!account.expires_at) return auth

  const isTokenExpired = dayjs((account.expires_at || 0) * 1000).isBefore(
    new Date(),
  )

  console.log(auth)

  if (isTokenExpired) {
    const { credentials } = await auth.refreshAccessToken()
    const {
      id_token,
      scope,
      access_token,
      expiry_date: expires_at,
      refresh_token,
      token_type,
    } = credentials

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        scope,
        id_token,
        expires_at: expires_at ? Math.floor(expires_at / 1000) : null,
        token_type,
        access_token,
        refresh_token,
      },
    })

    auth.setCredentials({
      access_token,
      refresh_token,
      expiry_date: expires_at,
    })
  }

  return auth
}

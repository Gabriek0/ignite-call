import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { NextAuthHandler } from '../auth/[...nextauth].api'

import * as z from 'zod'
import { prisma } from '@/lib/prisma'

const userProfileRequestBody = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const { bio } = userProfileRequestBody.parse(req.body)
  const session = await getServerSession(req, res, NextAuthHandler(req, res))

  if (!session) {
    return res.status(401).end()
  }

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      bio,
    },
  })

  return res.status(204).end()
}

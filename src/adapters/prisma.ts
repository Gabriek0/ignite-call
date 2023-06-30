import { NextApiRequest, NextApiResponse } from "next";

import { Adapter } from "next-auth/adapters";

import { prisma } from "@/lib/prisma";

import { parseCookies, destroyCookie } from "nookies";

export default function PrismaAdapter(
  req: NextApiRequest,
  res: NextApiResponse
): Adapter {
  return {
    async createUser(user) {
      const { "@ignitecall:userId": userIdOnCookies } = parseCookies({
        req: req,
      });

      const data = await prisma.user.update({
        where: {
          id: userIdOnCookies,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });

      destroyCookie({ res }, "@ignitecall:userId");

      return {
        id: data.id,
        name: data.name,
        email: data.email!,
        emailVerified: null,
        username: data.username,
        avatar_url: data.avatar_url!,
      };
    },
    async getUser(id) {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          id,
        },
      });

      return {
        id: user.id,
        email: user.email!,
        emailVerified: null,
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url!,
      };
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const { user } = await prisma.account.findUniqueOrThrow({
        where: {
          provider_provider_account_id: {
            provider: provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      });

      return {
        id: user.id,
        email: user.email!,
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async updateUser(user) {
      const data = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });

      return {
        id: data.id,
        email: data.email!,
        name: data.name,
        username: data.username,
        avatar_url: data.avatar_url!,
        emailVerified: null,
      };
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
      });

      return {
        id: user.id,
        email: user.email!,
        emailVerified: null,
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url!,
      };
    },
    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      });
    },
    async getSessionAndUser(sessionToken) {
      const { user, ...session } = await prisma.session.findUniqueOrThrow({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      });

      return {
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.user_id,
        },
        user: {
          id: user.id,
          email: user.email!,
          name: user.name,
          username: user.username,
          avatar_url: user.avatar_url!,
          emailVerified: null,
        },
      };
    },
    async createSession({ sessionToken, userId, expires }) {
      const session = await prisma.session.create({
        data: {
          user_id: userId,
          expires: expires,
          session_token: sessionToken,
        },
      });

      return {
        userId: session.user_id,
        expires: session.expires,
        sessionToken: session.session_token,
      };
    },
    async updateSession({ sessionToken, expires, userId }) {
      const session = await prisma.session.update({
        data: {
          session_token: sessionToken,
          expires: expires,
        },
        where: {
          session_token: sessionToken,
        },
      });

      return {
        expires: session.expires,
        sessionToken: session.session_token,
        userId: session.user_id,
      };
    },
    async deleteSession(sessionToken) {
      const session = await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      });

      return {
        userId: session.user_id,
        expires: session.expires,
        sessionToken: session.session_token,
      };
    },
  };
}

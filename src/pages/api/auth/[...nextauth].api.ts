import { NextApiRequest, NextApiResponse, NextPageContext } from "next";

import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";

import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import PrismaAdapter from "@/adapters/prisma";

export function NextAuthHandler(
  req: NextApiRequest | NextPageContext["req"],
  res: NextApiResponse | NextPageContext["res"]
): AuthOptions {
  return {
    secret: process.env.NEXTAUTH_SESSION,
    adapter: PrismaAdapter(req, res),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            username: "",
            avatar_url: profile.picture,
            name: profile.name,
            email: profile.email,
          };
        },
        authorization: {
          params: {
            scope:
              "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar",
            prompt: "consent",
            acces_type: "offline",
            response_type: "code",
          },
        },
      }),
    ],

    callbacks: {
      async signIn({ account }) {
        const calendar = "https://www.googleapis.com/auth/calendar";

        if (!account?.scope?.includes(calendar)) {
          return "/register/connect-calendar?error=permissions";
        }

        return true;
      },
      async session({ user, session }) {
        return {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            avatar_url: user.avatar_url,
          },
          expires: session.expires,
        };
      },
    },
  };
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, NextAuthHandler(req, res));
}

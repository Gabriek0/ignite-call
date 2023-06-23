import { AuthOptions, CallbacksOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SESSION,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

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
  },
};

export default NextAuth(authOptions);

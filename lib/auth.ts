import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prismadb"
import { getUserByIdDB } from "@/db/user"
import { getUsersStripeIdDB } from "@/db/payments"

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user, account, trigger, session }) {
      if (trigger === "update") {
        if (session && session.user) {
          token = {
            ...token,
            ...session.user,
          }
        }
        return token
      }
      if (account) {
        getUsersStripeIdDB(user.id)
          .then(
            (data) => (token.premium_user = data?.subscription_active ?? false)
          )
          .catch((e) => console.error(e))
        token.accessToken = account.access_token
        token.id = user.id
        token.added_linkedin = user.added_linkedin
      }
      return token
    },
    session({ session, token, trigger }) {
      if (token) {
        session.user.id = token.id
        session.user.added_linkedin = token.added_linkedin
        session.user.premium_user = token.premium_user
      }

      return session
    },
  },
  pages: {
    signIn: "/app/login",
    error: "/app/login",
  },
  debug: process.env.NODE_ENV === "development",
}

export default authOptions

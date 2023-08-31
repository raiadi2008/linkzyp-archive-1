import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      added_linkedin: boolean
      premium_user: boolean
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    added_linkedin: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    added_linkedin: boolean
  }
}

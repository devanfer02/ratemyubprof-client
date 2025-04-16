// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string
      refreshToken: string
      id: string
    }
  }

  interface User {
    accessToken: string
    refreshToken: string
    id: string 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string 
    accessToken: string
    refreshToken: string
    username?: string
  }
}

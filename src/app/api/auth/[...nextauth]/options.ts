import { API_KEY, BASE_URL } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          label: "username",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "RMUBP-API-KEY": `${API_KEY}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              password: credentials?.password,
              username: credentials?.username,
            }),
          })

          const data = await res.json()

          if (!res.ok) {
            return null 
          }

          const decoded = jwtDecode(data.data.accessToken as string)

          return {
            id: decoded.jti!,
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          } as User
        } catch (err) {
          throw new Error("An error occurred while logging in.");
        }
      }, 
    }),
  ],
  pages: {
    signIn: "/?authDialog=signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        id: token.id,
        
      };
  
      return session; 
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
  
      return token;
    },
    
  },
  secret: process.env.NEXTAUTH_SECRET,
};
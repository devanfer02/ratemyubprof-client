import { API_KEY, BASE_URL } from "@/services/api";
import { NextAuthOptions } from "next-auth";
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
              "x-api-key": `Key ${API_KEY}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              password: credentials?.password,
              username: credentials?.username,
            }),
          })

          const data = await res.json()

          return data 
        } catch (err) {
          throw new Error("An error occurred during authentication.");
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
      if (token) {
        session.user = token;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;

      return { ...token, ...user };
    },
    
  },
  secret: process.env.NEXTAUTH_SECRET,
};
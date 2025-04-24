import { z } from "zod";

const envSchema = z.object({
  API_BASE_URL: z.string().nonempty("API_BASE_URL is required"),
  API_KEY: z.string().nonempty("API_KEY is required"),
  NEXTAUTH_URL: z.string().nonempty("NEXTAUTH_URL is required"),
  NEXTAUTH_SECRET: z.string().nonempty("NEXTAUTH_SECRET is required"),
})

const _env = {
  API_BASE_URL: process.env.API_BASE_URL,
  API_KEY: process.env.API_KEY,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
};

export const env = envSchema.parse(_env);
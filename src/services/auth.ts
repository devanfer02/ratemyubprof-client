"use server"

import { RegisterFormData } from "@/types/auth";
import { env } from "@/lib/env";
import { toTitleCase } from "@/lib/string";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function registerUser(formData: RegisterFormData): Promise<Error | null> {
  try {
    const res = await fetch(env.API_BASE_URL + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "RMUBP-API-KEY": env.API_KEY,
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (!res.ok) {

      return Error(toTitleCase(data.message) || "Failed to register user")
    }

    return null 
  } catch(err) {
    console.log(err)
    return new Error("An error occurred while registering user")
  }
}

export async function getServerAuthStatus() {
  const session = await getServerSession(authOptions);
  return session ? "authenticated" : "unauthenticated";
}

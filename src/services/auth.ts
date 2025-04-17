"use server"

import { RegisterFormData } from "@/types/auth";
import { API_KEY, BASE_URL } from "./api";
import { toTitleCase } from "@/utils/string";

export async function registerUser(formData: RegisterFormData): Promise<Error | null> {
  try {
    const res = await fetch(BASE_URL + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "RMUBP-API-KEY": API_KEY,
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
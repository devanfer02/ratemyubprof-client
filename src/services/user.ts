"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { env } from "@/lib/env"
import { getServerSession } from "next-auth"

export async function fetchUserProfile(): Promise<[UserProfile,  Error | null]> {
  try {
    const session = await getServerSession(authOptions)
    const userToken = session?.user.accessToken

    if (!userToken) {
      return [{} as UserProfile, new Error("User token not found")]
    }

    const res = await fetch(`${env.API_BASE_URL}/users/profile`, {
      headers: {
        "Content-Type": "application/json",
        'RMUBP-API-KEY': env.API_KEY,
        "Authorization": `Bearer ${userToken}`
      }
    })

    const data = await res.json()

    if (!res.ok) {
      return [{} as UserProfile, Error((data.message) || "Failed to fetch user's profile")]
    }

    return [data.data as UserProfile, null]
  } catch (err) {
    return [{} as UserProfile,  new Error("An error occurred while fetching user profile")]
  }
}

export async function fetchUserProfileByUsername(username: string): Promise<[UserProfile,  Error | null]> {
  try {
    const res = await fetch(`${env.API_BASE_URL}/users/profile/${username}`, {
      headers: {
        "Content-Type": "application/json",
        'RMUBP-API-KEY': env.API_KEY
      }
    })

    const data = await res.json()

    if (!res.ok) {
      return [{} as UserProfile, Error((data.message) || "Failed to fetch user's profile")]
    }

    return [data.data as UserProfile, null]
  } catch (err) {
    return [{} as UserProfile,  new Error("An error occurred while fetching user profile")]
  }
}
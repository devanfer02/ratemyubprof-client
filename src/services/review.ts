"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { env } from "@/lib/env"
import { getServerSession } from "next-auth"

export async function fetchReviewByProfessorId(id: string, page: string): Promise<[Review[] | null, PaginationMeta | null, Error | null]> {
  try {
    const session = await getServerSession(authOptions)
    const userToken = session?.user.accessToken || "";

    const res = await fetch(`${env.API_BASE_URL}/professors/${id}/reviews?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "RMUBP-API-KEY": env.API_KEY,
        "Authorization": `Bearer ${userToken}`,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      return [null, null, Error((data.message) || "Failed to fetch reviews")]
    }

    return [data.data as Review[], data.meta as PaginationMeta, null]
  } catch (err) {
    return [null, null, err as Error]
  }

}

export async function createReaction(id: string, reactionType: string): Promise<Error | null> {
  try {
    const session = await getServerSession(authOptions)
    const userToken = session?.user.accessToken;

    if (!userToken) {
      return new Error("User token not found")
    }

    const res = await fetch(`${env.API_BASE_URL}/reviews/${id}/reactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "RMUBP-API-KEY": env.API_KEY,
        "Authorization": `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        type: reactionType
      })
    })

    const data = await res.json()

    if (!res.ok) {
      return Error((data.message) || "Failed to create reaction")
    }

    return null 
  } catch (err) {
    return new Error("An error occurred while creating reaction")
  }
}

export async function deleteReaction(id: string): Promise<Error | null> {
  try {
    const session = await getServerSession(authOptions)
    const userToken = session?.user.accessToken;

    if (!userToken) {
      return new Error("User token not found")
    }

    const res = await fetch(`${env.API_BASE_URL}/reviews/${id}/reactions`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "RMUBP-API-KEY": env.API_KEY,
        "Authorization": `Bearer ${userToken}`,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      return Error((data.message) || "Failed to delete reaction")
    }

    return null 
  } catch (err) {
    return new Error("An error occurred while deleting reaction")
  } 
}
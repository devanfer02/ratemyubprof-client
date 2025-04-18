"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { API_KEY, BASE_URL } from "./api"
import { getServerSession } from "next-auth"

export async function fetchReviewByProfessorId(id: string, page: string): Promise<[Review[] | null, PaginationMeta | null, Error | null]> {
  try {
    const res = await fetch(`${BASE_URL}/professors/${id}/reviews?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "RMUBP-API-KEY": API_KEY,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      return [null, null, Error((data.message) || "Failed to fetch professor by id")]
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

    const res = await fetch(`${BASE_URL}/reviews/${id}/reactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "RMUBP-API-KEY": API_KEY,
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
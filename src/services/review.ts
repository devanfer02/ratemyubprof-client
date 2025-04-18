"use server"

import { API_KEY, BASE_URL } from "./api"

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
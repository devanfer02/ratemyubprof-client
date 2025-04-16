"use server"

import { API_KEY, BASE_URL } from "./api";

export async function fetchProfessors(params: FetchProfParam): Promise<[Professor[] | null, PaginationMeta | null, Error | null]> {
  try {
    const queryString = new URLSearchParams(params).toString();

    const fullUrl = `${BASE_URL}/professors?${queryString}`;

    const res = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "RMUBP-API-KEY": API_KEY,
      },
    })

    const data = await res.json()

    if (!res.ok) {

      return [null, null, Error((data.message) || "Failed to register user")]
    }

    return [data.data as Professor[], data.meta as PaginationMeta, null]
  } catch(err) {
    return [null, null, err as Error]
  }
}
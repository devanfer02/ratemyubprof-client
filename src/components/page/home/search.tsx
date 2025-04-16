"use client"

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchInput() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      e.preventDefault()

      router.push("/professors?name=" + query)
    }
  }


  return (
    <>
      <div className="flex items-center bg-white rounded-xl px-4 py-2 shadow-md">
        <span className="text-gray-500 mr-2">🏫</span>
        <Input
          type="text"
          placeholder="Search for a professor..."
          className="flex-1 outline-none text-black bg-transparent border-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleEnter}
        />
      </div>
    </>
  )
}
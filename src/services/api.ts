import assert from "assert";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
export const API_KEY = process.env.API_KEY!

assert.ok(BASE_URL && BASE_URL.trim() !== "", "NEXT_PUBLIC_API_BASE_URL is missing or empty");
assert.ok(API_KEY && API_KEY.trim() !== "", "API_KEY is missing or empty");
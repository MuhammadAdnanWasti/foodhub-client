"use server"
import { cookies } from "next/headers";

export const apiFetch = async (path: string, init?: RequestInit) => {
  const token = (await cookies()).get("token")?.value;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
};

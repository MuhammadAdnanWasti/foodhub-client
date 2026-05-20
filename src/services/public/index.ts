"use server"
import { apiFetch } from "@/lib/api";

export const getCategories = async () => {
  try {
    const res = await apiFetch("/admin/categories");
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
};

export const getAllProviders = async () => {
  try {
    const res = await apiFetch("/api/providers");
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
};

export const getProviderById = async (id: string) => {
  try {
    const res = await apiFetch(`/api/providers/${id}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
};

export const getMealById = async (id: string) => {
  try {
    const res = await apiFetch(`/api/meals/${id}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
};

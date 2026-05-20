"use server"
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";

export const getAllCategories = async () => {
  try {
    const res = await apiFetch("/admin/categories");
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
};

export const getCategoryById = async (id: string) => {
  const categories = await getAllCategories();
  return categories.find((c: { id: string }) => c.id === id) ?? null;
};

type CategoryPayload = {
  name: string;
  description: string;
};

export const createCategory = async (payload: CategoryPayload) => {
  const res = await apiFetch("/admin/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (data.success) {
    revalidatePath("/dashboard/categories");
  }
  return data;
};

export const updateCategory = async (id: string, payload: Partial<CategoryPayload>) => {
  const res = await apiFetch(`/admin/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (data.success) {
    revalidatePath("/dashboard/categories");
  }
  return data;
};

export const deleteCategory = async (id: string) => {
  const res = await apiFetch(`/admin/categories/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (data.success) {
    revalidatePath("/dashboard/categories");
  }
  return data;
};

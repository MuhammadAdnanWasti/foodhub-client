"use server"
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";

export const getProviderApplications = async () => {
  const response = await apiFetch("/api/admin/provider-applications");
  if (!response.ok) return { success: false, data: [] };
  return response.json();
};

export const approveProviderApplication = async (id: string) => {
  const response = await apiFetch(`/api/admin/provider-applications/${id}/approve`, {
    method: "PATCH",
  });
  const data = await response.json();
  if (data.success) revalidatePath("/dashboard");
  return data;
};

export const rejectProviderApplication = async (id: string) => {
  const response = await apiFetch(`/api/admin/provider-applications/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (data.success) revalidatePath("/dashboard");
  return data;
};

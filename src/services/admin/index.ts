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

export const getAllUsers = async () => {
  try {
    const res = await apiFetch("/api/admin/users");
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
};

export const updateUserStatus = async (id: string, status: "ACTIVE" | "SUSPENDED") => {
  const res = await apiFetch(`/api/admin/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (data.success) {
    revalidatePath("/dashboard/users");
  }
  return data;
};

export const getAllOrders = async () => {
  try {
    const res = await apiFetch("/api/admin/orders");
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
};

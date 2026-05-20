"use server"
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";
import { getMe } from "@/services/auth";

type ApplyProviderPayload = {
  restaurantName: string;
  address: string;
  phone: string;
};

export const applyToBecomeProvider = async (payload: ApplyProviderPayload) => {
  const response = await apiFetch("/api/provider/apply", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (data.success) {
    revalidatePath("/dashboard");
  }
  return data;
};

export const getMyProviderMeals = async () => {
  try {
    const me = await getMe();
    const providerId = me?.provider?.id;
    if (!providerId) return [];
    const res = await apiFetch(`/api/providers/${providerId}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data?.meals ?? [];
  } catch {
    return [];
  }
};

type MealPayload = {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryName: string;
};

export const createMeal = async (payload: MealPayload) => {
  const res = await apiFetch("/api/meals/provider", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (data.success) {
    revalidatePath("/dashboard/meals");
  }
  return data;
};

export const updateMeal = async (id: string, payload: Partial<MealPayload>) => {
  const res = await apiFetch(`/api/meals/provider/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (data.success) {
    revalidatePath("/dashboard/meals");
  }
  return data;
};

export const deleteMeal = async (id: string) => {
  const res = await apiFetch(`/api/meals/provider/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (data.success) {
    revalidatePath("/dashboard/meals");
  }
  return data;
};

export const getMyProviderOrders = async () => {
  try {
    const res = await apiFetch("/api/provider/orders");
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
};

export const updateProviderOrderStatus = async (id: string, status: string) => {
  const res = await apiFetch(`/api/provider/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (data.success) {
    revalidatePath("/dashboard/orders");
  }
  return data;
};

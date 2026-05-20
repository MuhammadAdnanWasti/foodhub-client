"use server"
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";

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

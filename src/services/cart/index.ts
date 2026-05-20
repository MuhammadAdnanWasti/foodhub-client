"use server"
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";

export const getMyCart = async () => {
    try {
        const res = await apiFetch("/api/cart");
        if (!res.ok) return null;
        const json = await res.json();
        return json?.data ?? null;
    } catch {
        return null;
    }
};

export const addToCart = async (mealId: string) => {
    const res = await apiFetch("/api/cart/items", {
        method: "POST",
        body: JSON.stringify({ mealId }),
    });
    const data = await res.json();
    if (data.success) {
        revalidatePath("/dashboard/cart");
    }
    return data;
};

export const updateCartItemQuantity = async (mealId: string, quantity: number) => {
    const res = await apiFetch(`/api/cart/items/${mealId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
    });
    const data = await res.json();
    if (data.success) {
        revalidatePath("/dashboard/cart");
    }
    return data;
};

export const removeCartItem = async (mealId: string) => {
    const res = await apiFetch(`/api/cart/items/${mealId}`, {
        method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
        revalidatePath("/dashboard/cart");
    }
    return data;
};

export const clearCart = async () => {
    const res = await apiFetch("/api/cart", { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
        revalidatePath("/dashboard/cart");
    }
    return data;
};

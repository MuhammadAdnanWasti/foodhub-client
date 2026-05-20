"use server"
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";

export const getMyOrders = async () => {
    try {
        const res = await apiFetch("/api/orders");
        if (!res.ok) return [];
        const json = await res.json();
        return json?.data ?? [];
    } catch {
        return [];
    }
};

export const getMyOrderById = async (id: string) => {
    try {
        const res = await apiFetch(`/api/orders/${id}`);
        if (!res.ok) return null;
        const json = await res.json();
        return json?.data ?? null;
    } catch {
        return null;
    }
};

export const cancelOrder = async (id: string) => {
    const res = await apiFetch(`/api/orders/${id}/cancel`, { method: "PATCH" });
    const data = await res.json();
    if (data.success) {
        revalidatePath("/dashboard/orders");
    }
    return data;
};

export const checkoutFromCart = async (deliveryAddress: string) => {
    const res = await apiFetch("/api/orders/checkout-from-cart", {
        method: "POST",
        body: JSON.stringify({ deliveryAddress }),
    });
    const data = await res.json();
    if (data.success) {
        revalidatePath("/dashboard/orders");
        revalidatePath("/dashboard/cart");
    }
    return data;
};

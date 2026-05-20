"use server"
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";

export const getReviewsByMeal = async (mealId: string) => {
    try {
        const res = await apiFetch(`/api/reviews/meal/${mealId}`);
        if (!res.ok) return [];
        const json = await res.json();
        return json?.data ?? [];
    } catch {
        return [];
    }
};

export const getReviewsByProvider = async (providerId: string) => {
    try {
        const res = await apiFetch(`/api/reviews/provider/${providerId}`);
        if (!res.ok) return [];
        const json = await res.json();
        return json?.data ?? [];
    } catch {
        return [];
    }
};

export const getMyReviews = async () => {
    try {
        const res = await apiFetch("/api/reviews/me");
        if (!res.ok) return [];
        const json = await res.json();
        return json?.data ?? [];
    } catch {
        return [];
    }
};

export const createReview = async (payload: {
    mealId: string;
    rating: number;
    comment?: string;
}) => {
    const res = await apiFetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.success) {
        revalidatePath("/dashboard/reviews");
    }
    return data;
};

export const updateReview = async (
    id: number,
    payload: { rating?: number; comment?: string }
) => {
    const res = await apiFetch(`/api/reviews/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.success) {
        revalidatePath("/dashboard/reviews");
    }
    return data;
};

export const deleteReview = async (id: number) => {
    const res = await apiFetch(`/api/reviews/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
        revalidatePath("/dashboard/reviews");
    }
    return data;
};

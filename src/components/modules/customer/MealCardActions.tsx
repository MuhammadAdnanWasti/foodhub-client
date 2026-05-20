"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Plus, Minus, MessageSquare } from "lucide-react"
import { addToCart, updateCartItemQuantity, removeCartItem } from "@/services/cart"
import { ReviewDialog } from "./ReviewDialog"

type Review = {
    id: number
    rating: number
    comment?: string | null
    createdAt: string
    user: { id: string; name: string }
}

type Meal = {
    id: string
    name: string
}

type MealCardActionsProps = {
    meal: Meal
    initialQuantity: number
    isLoggedIn: boolean
    currentUserId?: string
    reviews: Review[]
    restaurantPath: string
}

export function MealCardActions({
    meal,
    initialQuantity,
    isLoggedIn,
    currentUserId,
    reviews,
    restaurantPath,
}: MealCardActionsProps) {
    const [quantity, setQuantity] = useState(initialQuantity)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const requireAuth = () => {
        router.push(`/login?redirect=${encodeURIComponent(restaurantPath)}`)
    }

    const handleAdd = () => {
        if (!isLoggedIn) { requireAuth(); return }
        startTransition(async () => {
            const result = await addToCart(meal.id)
            if (result.success) {
                setQuantity((q) => q + 1)
            } else {
                toast.error(result.message || "Failed to add to cart")
            }
        })
    }

    const handleIncrease = () => {
        startTransition(async () => {
            const result = await updateCartItemQuantity(meal.id, quantity + 1)
            if (result.success) {
                setQuantity((q) => q + 1)
            } else {
                toast.error(result.message || "Failed to update cart")
            }
        })
    }

    const handleDecrease = () => {
        const newQty = quantity - 1
        startTransition(async () => {
            if (newQty <= 0) {
                const result = await removeCartItem(meal.id)
                if (result.success) {
                    setQuantity(0)
                } else {
                    toast.error(result.message || "Failed to remove item")
                }
            } else {
                const result = await updateCartItemQuantity(meal.id, newQty)
                if (result.success) {
                    setQuantity(newQty)
                } else {
                    toast.error(result.message || "Failed to update cart")
                }
            }
        })
    }

    return (
        <div className="flex items-center justify-between pt-2">
            {/* Cart controls */}
            {quantity === 0 ? (
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={isPending}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors disabled:opacity-60"
                >
                    <Plus className="size-3.5" />
                    Add
                </button>
            ) : (
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={handleDecrease}
                        disabled={isPending}
                        className="w-7 h-7 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-700 flex items-center justify-center transition-colors disabled:opacity-60"
                    >
                        <Minus className="size-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-gray-900">
                        {quantity}
                    </span>
                    <button
                        type="button"
                        onClick={handleIncrease}
                        disabled={isPending}
                        className="w-7 h-7 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors disabled:opacity-60"
                    >
                        <Plus className="size-3.5" />
                    </button>
                </div>
            )}

            {/* Reviews */}
            <ReviewDialog
                mealId={meal.id}
                mealName={meal.name}
                initialReviews={reviews}
                currentUserId={currentUserId}
                isLoggedIn={isLoggedIn}
                trigger={
                    <button
                        type="button"
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-500 transition-colors"
                    >
                        <MessageSquare className="size-3.5" />
                        {reviews.length > 0 ? `${reviews.length}` : "Review"}
                    </button>
                }
            />
        </div>
    )
}

"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { MessageSquare, X, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "./StarRating"
import { ReviewCard } from "./ReviewCard"
import { createReview, updateReview, deleteReview } from "@/services/review"

type Review = {
    id: number
    rating: number
    comment?: string | null
    createdAt: string
    user: { id: string; name: string }
}

type ReviewDialogProps = {
    mealId: string
    mealName: string
    initialReviews: Review[]
    currentUserId?: string
    isLoggedIn: boolean
    trigger?: React.ReactNode
}

export function ReviewDialog({
    mealId,
    mealName,
    initialReviews,
    currentUserId,
    isLoggedIn,
    trigger,
}: ReviewDialogProps) {
    const [open, setOpen] = useState(false)
    const [reviews, setReviews] = useState<Review[]>(initialReviews)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const myReview = reviews.find((r) => r.user.id === currentUserId)

    const resetForm = () => {
        setRating(5)
        setComment("")
        setEditingId(null)
    }

    const startEdit = (review: Review) => {
        setEditingId(review.id)
        setRating(review.rating)
        setComment(review.comment ?? "")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            let result
            if (editingId !== null) {
                result = await updateReview(editingId, { rating, comment })
            } else {
                result = await createReview({ mealId, rating, comment })
            }

            if (result.success) {
                toast.success(editingId ? "Review updated!" : "Review submitted!")
                router.refresh()
                setOpen(false)
                resetForm()
            } else {
                toast.error(result.message || "Something went wrong.")
            }
        } catch {
            toast.error("An error occurred.")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this review?")) return
        setLoading(true)
        try {
            const result = await deleteReview(id)
            if (result.success) {
                toast.success("Review deleted.")
                setReviews((prev) => prev.filter((r) => r.id !== id))
                router.refresh()
            } else {
                toast.error(result.message || "Failed to delete review.")
            }
        } catch {
            toast.error("An error occurred.")
        } finally {
            setLoading(false)
        }
    }

    const avgRating = reviews.length
        ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
        : null

    return (
        <>
            <div onClick={() => setOpen(true)}>
                {trigger ?? (
                    <button
                        type="button"
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-500 transition-colors"
                    >
                        <MessageSquare className="size-3.5" />
                        Reviews {reviews.length > 0 && `(${reviews.length})`}
                    </button>
                )}
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <div>
                                <h2 className="font-semibold text-gray-900 text-lg">{mealName}</h2>
                                <div className="flex items-center gap-2 mt-0.5">
                                    {avgRating ? (
                                        <>
                                            <StarRating value={parseFloat(avgRating)} readonly size="sm" />
                                            <span className="text-xs text-gray-500">
                                                {avgRating} ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-xs text-gray-400">No reviews yet</span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => { setOpen(false); resetForm() }}
                                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            {/* Create / Edit form */}
                            {isLoggedIn && (!myReview || editingId !== null) && (
                                <form onSubmit={handleSubmit} className="space-y-3 pb-4 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-700">
                                        {editingId ? "Edit your review" : "Write a review"}
                                    </p>
                                    <StarRating value={rating} onChange={setRating} />
                                    <Textarea
                                        placeholder="Share your experience (optional)"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        rows={3}
                                        className="resize-none text-sm"
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-orange-500 hover:bg-orange-600 text-white h-9 text-sm"
                                        >
                                            {loading ? "Saving..." : editingId ? "Update" : "Submit"}
                                        </Button>
                                        {editingId && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={resetForm}
                                                className="h-9 text-sm"
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            )}

                            {/* Review list */}
                            {reviews.length === 0 ? (
                                <div className="text-center py-10 text-gray-400 space-y-2">
                                    <MessageSquare className="size-10 mx-auto opacity-30" />
                                    <p className="text-sm">Be the first to review this meal</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {reviews.map((review) => (
                                        <ReviewCard
                                            key={review.id}
                                            review={review}
                                            actions={
                                                review.user.id === currentUserId ? (
                                                    <div className="flex gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => startEdit(review)}
                                                            className="p-1 rounded text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                                                        >
                                                            <Pencil className="size-3.5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(review.id)}
                                                            disabled={loading}
                                                            className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                        >
                                                            <Trash2 className="size-3.5" />
                                                        </button>
                                                    </div>
                                                ) : null
                                            }
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Prompt login */}
                            {!isLoggedIn && (
                                <p className="text-center text-sm text-gray-500 pt-2">
                                    <a href="/login" className="text-orange-500 hover:underline font-medium">Sign in</a> to write a review.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

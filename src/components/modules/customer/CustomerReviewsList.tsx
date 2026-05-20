"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Pencil, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "./StarRating"
import { deleteReview, updateReview } from "@/services/review"

type Review = {
  id: number
  rating: number
  comment?: string | null
  createdAt: string
  updatedAt: string
  meal: {
    id: string
    name: string
    provider?: { restaurantName: string }
  }
}

export function CustomerReviewsList({ reviews: initialReviews }: { reviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editRating, setEditRating] = useState(5)
  const [editComment, setEditComment] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center gap-3">
        <Star className="size-12 text-gray-200" />
        <p className="text-base font-medium text-gray-600">No reviews yet</p>
        <p className="text-sm text-gray-400">Browse restaurants and leave reviews for meals you enjoy</p>
      </div>
    )
  }

  const startEdit = (review: Review) => {
    setEditingId(review.id)
    setEditRating(review.rating)
    setEditComment(review.comment ?? "")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditRating(5)
    setEditComment("")
  }

  const handleUpdate = async (id: number) => {
    setLoading(true)
    try {
      const result = await updateReview(id, { rating: editRating, comment: editComment })
      if (result.success) {
        toast.success("Review updated!")
        setReviews((prev) =>
          prev.map((r) => r.id === id ? { ...r, rating: editRating, comment: editComment } : r)
        )
        cancelEdit()
        router.refresh()
      } else {
        toast.error(result.message || "Failed to update review.")
      }
    } catch {
      toast.error("An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this review? This cannot be undone.")) return
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

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-gray-900">{review.meal.name}</p>
              {review.meal.provider && (
                <p className="text-xs text-gray-400">{review.meal.provider.restaurantName}</p>
              )}
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {editingId !== review.id && (
                <>
                  <StarRating value={review.rating} readonly size="sm" />
                  <button
                    onClick={() => startEdit(review)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    disabled={loading}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {editingId === review.id ? (
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <StarRating value={editRating} onChange={setEditRating} />
              <Textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                rows={3}
                className="resize-none text-sm"
                placeholder="Your review comment..."
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleUpdate(review.id)}
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white h-8 text-xs"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={cancelEdit}
                  className="h-8 text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            review.comment && (
              <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
            )
          )}
        </div>
      ))}
    </div>
  )
}

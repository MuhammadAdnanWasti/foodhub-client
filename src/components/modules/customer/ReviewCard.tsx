import { StarRating } from "./StarRating"

type ReviewCardProps = {
    review: {
        id: number
        rating: number
        comment?: string | null
        createdAt: string
        user: { id: string; name: string }
    }
    actions?: React.ReactNode
}

export function ReviewCard({ review, actions }: ReviewCardProps) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-2">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-semibold text-orange-600">
                        {review.user.name.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{review.user.name}</p>
                        <p className="text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <StarRating value={review.rating} readonly size="sm" />
                    {actions}
                </div>
            </div>
            {review.comment && (
                <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
            )}
        </div>
    )
}

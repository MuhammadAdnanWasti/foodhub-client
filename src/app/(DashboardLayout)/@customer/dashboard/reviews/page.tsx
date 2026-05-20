import { getMyReviews } from "@/services/review"
import { CustomerReviewsList } from "@/components/modules/customer/CustomerReviewsList"

export default async function CustomerReviewsPage() {
  const reviews = await getMyReviews()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage the reviews you have written
        </p>
      </div>
      <CustomerReviewsList reviews={reviews} />
    </div>
  )
}

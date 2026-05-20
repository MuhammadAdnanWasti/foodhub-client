import { MealForm } from "@/components/modules/provider/MealForm"
import { getCategories, getMealById } from "@/services/public"
import { getMe } from "@/services/auth"

export default async function ProviderEditMealPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [meal, categories, me] = await Promise.all([
    getMealById(id),
    getCategories(),
    getMe(),
  ])

  if (!meal) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Meal not found.</p>
      </div>
    )
  }

  const myProviderId = me?.provider?.id
  if (myProviderId && meal.provider?.id !== myProviderId) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-medium">You are not authorized to edit this meal.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Meal</h1>
        <p className="text-sm text-gray-500 mt-1">Update your menu item details</p>
      </div>
      <MealForm
        mode="edit"
        mealId={id}
        categories={categories}
        defaultValues={{
          name: meal.name,
          description: meal.description,
          price: meal.price,
          image: meal.image,
          categoryName: meal.category?.name ?? "",
        }}
      />
    </div>
  )
}

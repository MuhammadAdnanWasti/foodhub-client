import { MealForm } from "@/components/modules/provider/MealForm"
import { getCategories } from "@/services/public"

export default async function ProviderNewMealPage() {
  const categories = await getCategories()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Meal</h1>
        <p className="text-sm text-gray-500 mt-1">Create a new menu item for your restaurant</p>
      </div>
      <MealForm mode="create" categories={categories} />
    </div>
  )
}

import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getMyProviderMeals } from "@/services/provider"
import { MealsTable } from "@/components/modules/provider/MealsTable"

export default async function ProviderMealsPage() {
  const meals = await getMyProviderMeals()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Meals</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your restaurant menu</p>
        </div>
        <Link href="/dashboard/meals/new">
          <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
            <PlusIcon className="size-4" />
            Add Meal
          </Button>
        </Link>
      </div>

      <MealsTable meals={meals} />
    </div>
  )
}

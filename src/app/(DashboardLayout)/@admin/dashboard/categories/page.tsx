import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllCategories } from "@/services/categories"
import { CategoriesTable } from "@/components/modules/admin/CategoriesTable"

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage meal categories</p>
        </div>
        <Link href="/dashboard/categories/new">
          <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
            <PlusIcon className="size-4" />
            Add Category
          </Button>
        </Link>
      </div>

      <CategoriesTable categories={categories} />
    </div>
  )
}

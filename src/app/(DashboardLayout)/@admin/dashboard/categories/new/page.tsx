import { CategoryForm } from "@/components/modules/admin/CategoryForm"

export default function AdminNewCategoryPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Category</h1>
        <p className="text-sm text-gray-500 mt-1">Create a new meal category</p>
      </div>
      <CategoryForm mode="create" />
    </div>
  )
}

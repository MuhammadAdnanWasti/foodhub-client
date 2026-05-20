import { getCategoryById } from "@/services/categories"
import { CategoryForm } from "@/components/modules/admin/CategoryForm"

export default async function AdminEditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const category = await getCategoryById(id)

  if (!category) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Category not found.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
        <p className="text-sm text-gray-500 mt-1">Update category details</p>
      </div>
      <CategoryForm
        mode="edit"
        categoryId={id}
        defaultValues={{ name: category.name, description: category.description }}
      />
    </div>
  )
}

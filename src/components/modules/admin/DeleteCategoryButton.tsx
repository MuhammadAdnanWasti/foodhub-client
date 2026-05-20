"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteCategory } from "@/services/categories"

export function DeleteCategoryButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this category?")) return
    setLoading(true)
    try {
      const result = await deleteCategory(id)
      if (result.success) {
        toast.success("Category deleted.")
        router.refresh()
      } else {
        toast.error(result.message || "Failed to delete category.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleDelete}
      disabled={loading}
      className="border-red-200 text-red-600 hover:bg-red-50"
    >
      <Trash2Icon className="size-4" />
    </Button>
  )
}

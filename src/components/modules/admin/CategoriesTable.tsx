"use client"

import Link from "next/link"
import { PencilIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DeleteCategoryButton } from "@/components/modules/admin/DeleteCategoryButton"

type Category = {
  id: string
  name: string
  description: string
  meals: { id: string }[]
}

export function CategoriesTable({ categories }: { categories: Category[] }) {
  if (categories.length === 0) {
    return (
      <Card className="border border-gray-100 rounded-2xl shadow-sm">
        <CardContent className="py-16 flex flex-col items-center gap-3 text-center">
          <span className="text-4xl">🏷️</span>
          <p className="text-base font-medium text-gray-600">No categories yet</p>
          <p className="text-sm text-gray-400">Create your first category to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-center">Meals</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {categories.map((cat) => (
            <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900">{cat.name}</td>
              <td className="px-4 py-3 text-gray-500 max-w-[300px] truncate">{cat.description}</td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {cat.meals?.length ?? 0}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/dashboard/categories/${cat.id}/edit`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <PencilIcon className="size-4" />
                    </Button>
                  </Link>
                  <DeleteCategoryButton id={cat.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

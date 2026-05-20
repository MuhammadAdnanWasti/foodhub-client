"use client"

import Link from "next/link"
import Image from "next/image"
import { PencilIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DeleteMealButton } from "@/components/modules/provider/DeleteMealButton"

type Meal = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: { name: string }
}

export function MealsTable({ meals }: { meals: Meal[] }) {
  if (meals.length === 0) {
    return (
      <Card className="border border-gray-100 rounded-2xl shadow-sm">
        <CardContent className="py-16 flex flex-col items-center gap-3 text-center">
          <span className="text-4xl">🍽️</span>
          <p className="text-base font-medium text-gray-600">No meals yet</p>
          <p className="text-sm text-gray-400">Add your first meal to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {meals.map((meal) => (
            <tr key={meal.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
                  {meal.image ? (
                    <Image
                      src={meal.image}
                      alt={meal.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-xl">🍴</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <p className="font-medium text-gray-900">{meal.name}</p>
                <p className="text-xs text-gray-400 truncate max-w-[200px]">{meal.description}</p>
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                  {meal.category?.name ?? "—"}
                </span>
              </td>
              <td className="px-4 py-3 text-right font-semibold text-gray-900">
                ${meal.price.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/dashboard/meals/${meal.id}/edit`}>
                    <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                      <PencilIcon className="size-4" />
                    </Button>
                  </Link>
                  <DeleteMealButton id={meal.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

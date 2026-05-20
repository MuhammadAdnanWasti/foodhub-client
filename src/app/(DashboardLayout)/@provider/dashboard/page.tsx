import Link from "next/link"
import { PlusIcon, ClipboardListIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getMe } from "@/services/auth"
import { getMyProviderMeals, getMyProviderOrders } from "@/services/provider"

export default async function ProviderDashboardPage() {
  const [me, orders, meals] = await Promise.all([
    getMe(),
    getMyProviderOrders(),
    getMyProviderMeals(),
  ])

  const restaurantName = me?.provider?.restaurantName ?? "Your Restaurant"

  const pendingOrders = orders.filter((o: { status: string }) =>
    ["PLACED", "PREPARING", "READY"].includes(o.status)
  )
  const deliveredOrders = orders.filter(
    (o: { status: string }) => o.status === "DELIVERED"
  )

  const stats = [
    { label: "Total Meals", value: meals.length, color: "bg-orange-50 text-orange-600" },
    { label: "Total Orders", value: orders.length, color: "bg-blue-50 text-blue-600" },
    { label: "Active Orders", value: pendingOrders.length, color: "bg-yellow-50 text-yellow-600" },
    { label: "Delivered", value: deliveredOrders.length, color: "bg-green-50 text-green-600" },
  ]

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {restaurantName}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here&apos;s an overview of your restaurant activity
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-gray-100 rounded-2xl shadow-sm">
            <CardContent className="p-5 flex flex-col gap-1">
              <span className={`text-3xl font-bold ${stat.color.split(" ")[1]}`}>
                {stat.value}
              </span>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-base font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/meals/new">
            <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
              <PlusIcon className="size-4" />
              Add New Meal
            </Button>
          </Link>
          <Link href="/dashboard/orders">
            <Button variant="outline" className="flex items-center gap-2">
              <ClipboardListIcon className="size-4" />
              View Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

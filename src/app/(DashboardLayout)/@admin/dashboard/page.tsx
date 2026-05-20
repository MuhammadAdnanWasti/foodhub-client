import Link from "next/link"
import { UsersIcon, ClipboardListIcon, TagIcon, ShoppingBagIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getAllUsers, getProviderApplications, getAllOrders } from "@/services/admin"
import { getAllCategories } from "@/services/categories"

export default async function AdminDashboard() {
  const [usersRes, appsRes, orders, categories] = await Promise.all([
    getAllUsers(),
    getProviderApplications(),
    getAllOrders(),
    getAllCategories(),
  ])

  const users: { role: string }[] = Array.isArray(usersRes) ? usersRes : []
  const applications: unknown[] = Array.isArray(appsRes?.data) ? appsRes.data : []

  const providers = users.filter((u) => u.role === "PROVIDER").length
  const customers = users.filter((u) => u.role === "CUSTOMER").length

  const stats = [
    { label: "Total Users", value: users.length, color: "text-blue-600" },
    { label: "Providers", value: providers, color: "text-orange-600" },
    { label: "Customers", value: customers, color: "text-green-600" },
    { label: "Total Orders", value: orders.length, color: "text-purple-600" },
    { label: "Pending Applications", value: applications.length, color: "text-yellow-600" },
    { label: "Categories", value: categories.length, color: "text-gray-600" },
  ]

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-gray-100 rounded-2xl shadow-sm">
            <CardContent className="p-5 flex flex-col gap-1">
              <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-base font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/users">
            <Button variant="outline" className="flex items-center gap-2">
              <UsersIcon className="size-4" />
              Manage Users
            </Button>
          </Link>
          <Link href="/dashboard/provider-applications">
            <Button variant="outline" className="flex items-center gap-2">
              <ClipboardListIcon className="size-4" />
              Provider Applications
              {applications.length > 0 && (
                <span className="ml-1 text-xs bg-orange-100 text-orange-700 font-medium px-2 py-0.5 rounded-full">
                  {applications.length}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/dashboard/categories">
            <Button variant="outline" className="flex items-center gap-2">
              <TagIcon className="size-4" />
              Categories
            </Button>
          </Link>
          <Link href="/dashboard/orders">
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingBagIcon className="size-4" />
              All Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

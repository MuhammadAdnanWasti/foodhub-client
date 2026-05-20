import Link from "next/link"
import { ShoppingBagIcon, StarIcon, ShoppingCartIcon, StoreIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getMe } from "@/services/auth"
import { getMyOrders } from "@/services/order"
import { getMyReviews } from "@/services/review"
import { getMyCart } from "@/services/cart"
import { ApplyProviderForm } from "@/components/modules/provider/ApplyProviderForm"
import { PendingProviderCard } from "@/components/modules/provider/PendingProviderCard"

export default async function CustomerDashboard() {
  const [me, orders, reviews, cart] = await Promise.all([
    getMe(),
    getMyOrders(),
    getMyReviews(),
    getMyCart(),
  ])

  const hasPendingApplication = me?.role === "CUSTOMER" && !!me?.provider
  const cartItemCount = (cart?.items ?? []).reduce(
    (s: number, i: { quantity: number }) => s + i.quantity,
    0
  )

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: <ShoppingBagIcon className="size-5 text-blue-500" />,
      href: "/dashboard/orders",
      color: "bg-blue-50",
    },
    {
      label: "My Reviews",
      value: reviews.length,
      icon: <StarIcon className="size-5 text-amber-500" />,
      href: "/dashboard/reviews",
      color: "bg-amber-50",
    },
    {
      label: "Cart Items",
      value: cartItemCount,
      icon: <ShoppingCartIcon className="size-5 text-orange-500" />,
      href: "/dashboard/cart",
      color: "bg-orange-50",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {me?.name ?? "Customer"} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your orders, cart and account settings
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className={`p-4 flex flex-col gap-2 ${stat.color} rounded-2xl`}>
                {stat.icon}
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-xs text-gray-500">{stat.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-base font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/orders">
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingBagIcon className="size-4" />
              My Orders
            </Button>
          </Link>
          <Link href="/dashboard/cart">
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingCartIcon className="size-4" />
              My Cart
            </Button>
          </Link>
          <Link href="/dashboard/reviews">
            <Button variant="outline" className="flex items-center gap-2">
              <StarIcon className="size-4" />
              My Reviews
            </Button>
          </Link>
          <Link href="/dashboard/apply-provider">
            <Button variant="outline" className="flex items-center gap-2">
              <StoreIcon className="size-4" />
              Become a Provider
            </Button>
          </Link>
        </div>
      </div>

      {/* Provider application section */}
      <div className="border-t border-gray-100 pt-6">
        <h2 className="text-base font-semibold text-gray-700 mb-4">
          {hasPendingApplication ? "Provider Application Status" : "Want to sell on FoodHub?"}
        </h2>
        {hasPendingApplication ? (
          <PendingProviderCard profile={me.provider} />
        ) : (
          <div className="flex flex-col gap-3 max-w-sm">
            <p className="text-sm text-gray-500">
              Apply to become a restaurant partner and start earning on FoodHub.
            </p>
            <Link href="/dashboard/apply-provider">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
                <StoreIcon className="size-4" />
                Apply Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

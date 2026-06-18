"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cancelOrder } from "@/services/order"
import {
  CANCELLABLE_STATUSES,
  STATUS_BADGE,
  STATUS_LABEL,
  type Order,
} from "@/types/order"

export function CustomerOrdersList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <Card className="border border-gray-100 rounded-2xl shadow-sm">
        <CardContent className="py-16 flex flex-col items-center gap-3 text-center">
          <span className="text-4xl">🛍️</span>
          <p className="text-base font-medium text-gray-600">No orders yet</p>
          <p className="text-sm text-gray-400">Browse restaurants to place your first order</p>
          <Link href="/#restaurants">
            <Button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white">Browse Restaurants</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}

function OrderCard({ order }: { order: Order }) {
  const [status, setStatus] = useState(order.status)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const canCancel = CANCELLABLE_STATUSES.includes(status as (typeof CANCELLABLE_STATUSES)[number])

  const handleCancel = async () => {
    if (!confirm("Cancel this order?")) return
    setLoading(true)
    try {
      const result = await cancelOrder(order.id)
      if (result.success) {
        setStatus("CANCELLED")
        toast.success("Order cancelled.")
        router.refresh()
      } else {
        toast.error(result.message || "Failed to cancel order.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="px-5 pt-4 pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900">{order.provider.restaurantName}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              <span className="font-medium text-gray-700">Delivery: </span>
              {order.deliveryAddress}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_BADGE[status] ?? "bg-gray-100 text-gray-600"}`}
            >
              {STATUS_LABEL[status] ?? status}
            </span>
            {canCancel && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
                className="border-red-200 text-red-600 hover:bg-red-50 text-xs h-7"
              >
                {loading ? "Cancelling..." : "Cancel"}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-4 space-y-3">
        <div className="rounded-xl border border-gray-100 divide-y divide-gray-100">
          {order.orderItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-4 py-2 text-sm">
              <span className="text-gray-700">{item.meal.name}</span>
              <span className="text-gray-500 text-xs">x{item.quantity}</span>
              <span className="font-medium text-gray-900">
                ${(item.quantity * item.unitPrice).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-1">
          <Link
            href={`/dashboard/orders/${order.id}`}
            className="text-xs text-orange-500 hover:underline font-medium"
          >
            View details →
          </Link>
          <span className="text-sm font-bold text-gray-900">
            Total: ${order.totalPrice.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

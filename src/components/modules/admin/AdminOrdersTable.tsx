"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

const statusBadge: Record<string, string> = {
  PLACED: "bg-blue-100 text-blue-700",
  PREPARING: "bg-yellow-100 text-yellow-700",
  READY: "bg-green-100 text-green-700",
  DELIVERED: "bg-gray-100 text-gray-600",
  CANCELLED: "bg-red-100 text-red-600",
}

type OrderItem = {
  id: string
  quantity: number
  unitPrice: number
  meal: { name: string }
}

type Order = {
  id: string
  status: string
  totalPrice: number
  deliveryAddress: string
  createdAt: string
  user: { name: string; email: string }
  provider: { restaurantName: string }
  orderItems: OrderItem[]
}

export function AdminOrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <Card className="border border-gray-100 rounded-2xl shadow-sm">
        <CardContent className="py-16 flex flex-col items-center gap-3 text-center">
          <span className="text-4xl">📦</span>
          <p className="text-base font-medium text-gray-600">No orders yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="border border-gray-100 rounded-2xl shadow-sm">
          <CardHeader className="px-5 pt-4 pb-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">{order.user.name}</p>
                <p className="text-xs text-gray-500">{order.user.email}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Restaurant:{" "}
                  <span className="font-medium text-gray-600">
                    {order.provider?.restaurantName ?? "—"}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <span
                className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${statusBadge[order.status] ?? "bg-gray-100 text-gray-600"}`}
              >
                {order.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-4 space-y-3">
            <div className="text-xs text-gray-500">
              <span className="font-medium text-gray-700">Delivery: </span>
              {order.deliveryAddress}
            </div>

            <div className="rounded-xl border border-gray-100 divide-y divide-gray-100">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-4 py-2 text-sm">
                  <span className="text-gray-700">{item.meal.name}</span>
                  <span className="text-gray-500 text-xs">
                    x{item.quantity} @ ${item.unitPrice.toFixed(2)}
                  </span>
                  <span className="font-medium text-gray-900">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-1">
              <span className="text-sm font-bold text-gray-900">
                Total: ${order.totalPrice.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

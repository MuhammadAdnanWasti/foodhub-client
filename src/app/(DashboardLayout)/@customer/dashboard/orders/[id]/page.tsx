import Link from "next/link"
import { notFound } from "next/navigation"
import { getMyOrderById } from "@/services/order"
import { CancelOrderButton } from "@/components/modules/customer/CancelOrderButton"

const TIMELINE_STEPS = ["PLACED", "PREPARING", "READY", "DELIVERED"]

const statusBadge: Record<string, string> = {
  PLACED: "bg-blue-100 text-blue-700",
  PREPARING: "bg-yellow-100 text-yellow-700",
  READY: "bg-green-100 text-green-700",
  DELIVERED: "bg-gray-100 text-gray-600",
  CANCELLED: "bg-red-100 text-red-600",
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function CustomerOrderDetailPage({ params }: Props) {
  const { id } = await params
  const order = await getMyOrderById(id)

  if (!order) notFound()

  const isCancelled = order.status === "CANCELLED"
  const currentStepIndex = isCancelled ? -1 : TIMELINE_STEPS.indexOf(order.status)

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/orders"
          className="text-sm text-orange-500 hover:underline flex items-center gap-1"
        >
          ← Back to Orders
        </Link>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <p className="text-sm text-gray-500 mt-1">
            From: <span className="font-medium text-gray-700">{order.provider?.restaurantName}</span>
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusBadge[order.status] ?? "bg-gray-100 text-gray-600"}`}>
            {order.status}
          </span>
          {order.status === "PLACED" && <CancelOrderButton orderId={order.id} />}
        </div>
      </div>

      {/* Timeline */}
      {!isCancelled ? (
        <div className="rounded-2xl border border-gray-100 p-5 space-y-2">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Order Timeline</h2>
          <div className="flex items-center gap-0">
            {TIMELINE_STEPS.map((step, idx) => {
              const isDone = idx <= currentStepIndex
              const isActive = idx === currentStepIndex
              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                        isDone
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-white border-gray-200 text-gray-400"
                      } ${isActive ? "ring-2 ring-orange-200 ring-offset-1" : ""}`}
                    >
                      {idx + 1}
                    </div>
                    <span className={`text-xs font-medium ${isDone ? "text-orange-600" : "text-gray-400"}`}>
                      {step.charAt(0) + step.slice(1).toLowerCase()}
                    </span>
                  </div>
                  {idx < TIMELINE_STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-1 mb-5 ${idx < currentStepIndex ? "bg-orange-400" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700 font-medium">
          This order was cancelled.
        </div>
      )}

      {/* Delivery address */}
      <div className="rounded-2xl border border-gray-100 p-4 text-sm">
        <span className="font-medium text-gray-700">Delivery Address: </span>
        <span className="text-gray-600">{order.deliveryAddress}</span>
      </div>

      {/* Items */}
      <div className="rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Items Ordered</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {order.orderItems.map((item: { id: string; meal: { name: string }; quantity: number; unitPrice: number }) => (
            <div key={item.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="text-gray-700">{item.meal.name}</span>
              <span className="text-gray-400">x{item.quantity} @ ${item.unitPrice.toFixed(2)}</span>
              <span className="font-medium text-gray-900">${(item.quantity * item.unitPrice).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
          <span className="text-sm font-bold text-gray-900">Total: ${order.totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

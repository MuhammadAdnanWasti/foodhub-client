"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { cancelOrder } from "@/services/order"

export function CancelOrderButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCancel = async () => {
    if (!confirm("Cancel this order?")) return
    setLoading(true)
    try {
      const result = await cancelOrder(orderId)
      if (result.success) {
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
    <Button
      size="sm"
      variant="outline"
      onClick={handleCancel}
      disabled={loading}
      className="border-red-200 text-red-600 hover:bg-red-50 text-xs h-7"
    >
      {loading ? "Cancelling..." : "Cancel Order"}
    </Button>
  )
}

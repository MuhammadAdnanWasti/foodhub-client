"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { revalidateAfterPayment } from "@/services/order"

export function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get("session_id")
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    const pendingOrderId = sessionStorage.getItem("pendingOrderId")
    if (pendingOrderId) {
      setOrderId(pendingOrderId)
      sessionStorage.removeItem("pendingOrderId")
    }

    revalidateAfterPayment().then(() => router.refresh())
  }, [router])

  return (
    <div className="p-6 flex items-center justify-center min-h-[60vh]">
      <Card className="border border-gray-100 rounded-2xl shadow-sm max-w-md w-full">
        <CardContent className="py-10 px-6 flex flex-col items-center gap-4 text-center">
          <CheckCircle2 className="size-14 text-green-500" />
          <h1 className="text-xl font-bold text-gray-900">Payment Successful</h1>
          <p className="text-sm text-gray-500">
            Thank you! Your payment was received. Your order will be confirmed shortly.
          </p>
          {sessionId && (
            <p className="text-xs text-gray-400 break-all">
              Reference: {sessionId}
            </p>
          )}
          <div className="flex flex-col gap-2 w-full mt-2">
            {orderId && (
              <Link href={`/dashboard/orders/${orderId}`} className="w-full">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  View Order
                </Button>
              </Link>
            )}
            <Link href="/dashboard/orders" className="w-full">
              <Button variant="outline" className="w-full">
                View All Orders
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

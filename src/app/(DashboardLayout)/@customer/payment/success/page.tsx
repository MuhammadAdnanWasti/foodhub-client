import { Suspense } from "react"
import { PaymentSuccessContent } from "@/components/modules/customer/PaymentSuccessContent"

export default function CustomerPaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}

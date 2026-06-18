import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CustomerPaymentCancelPage() {
  return (
    <div className="p-6 flex items-center justify-center min-h-[60vh]">
      <Card className="border border-gray-100 rounded-2xl shadow-sm max-w-md w-full">
        <CardContent className="py-10 px-6 flex flex-col items-center gap-4 text-center">
          <XCircle className="size-14 text-red-400" />
          <h1 className="text-xl font-bold text-gray-900">Payment Cancelled</h1>
          <p className="text-sm text-gray-500">
            Your payment was not completed. Your cart items have been saved — you can try again when ready.
          </p>
          <Link href="/dashboard/cart" className="w-full mt-2">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Return to Cart
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

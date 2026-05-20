import { getMyCart } from "@/services/cart"
import { CartManager } from "@/components/modules/customer/CartManager"

export default async function CustomerCartPage() {
  const cart = await getMyCart()
  const items = cart?.items ?? []

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Cart</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review your items and place your order
        </p>
      </div>
      <CartManager initialItems={items} />
    </div>
  )
}

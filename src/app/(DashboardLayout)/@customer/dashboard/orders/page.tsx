import { getMyOrders } from "@/services/order"
import { CustomerOrdersList } from "@/components/modules/customer/CustomerOrdersList"

export default async function CustomerOrdersPage() {
  const orders = await getMyOrders()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track and manage all your orders
        </p>
      </div>
      <CustomerOrdersList orders={orders} />
    </div>
  )
}

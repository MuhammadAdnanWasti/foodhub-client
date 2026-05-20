import { getMyProviderOrders } from "@/services/provider"
import { ProviderOrdersTable } from "@/components/modules/provider/ProviderOrdersTable"

export default async function ProviderOrdersPage() {
  const orders = await getMyProviderOrders()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and update status for incoming orders
        </p>
      </div>

      <ProviderOrdersTable orders={orders} />
    </div>
  )
}

import { getAllOrders } from "@/services/admin"
import { AdminOrdersTable } from "@/components/modules/admin/AdminOrdersTable"

export default async function AdminOrdersPage() {
  const orders = await getAllOrders()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Orders</h1>
        <p className="text-sm text-gray-500 mt-1">View all orders across the platform</p>
      </div>

      <AdminOrdersTable orders={orders} />
    </div>
  )
}

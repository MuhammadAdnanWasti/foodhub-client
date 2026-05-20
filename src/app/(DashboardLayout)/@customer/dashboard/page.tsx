import { getMe } from "@/services/auth"
import { ApplyProviderForm } from "@/components/modules/provider/ApplyProviderForm"
import { PendingProviderCard } from "@/components/modules/provider/PendingProviderCard"

export default async function CustomerDashboard() {
  const me = await getMe()
  const hasPendingApplication = me?.role === "CUSTOMER" && !!me?.provider

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {me?.name ?? "Customer"} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your orders and account settings
        </p>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h2 className="text-base font-semibold text-gray-700 mb-4">
          {hasPendingApplication ? "Provider Application" : "Want to sell on FoodHub?"}
        </h2>
        {hasPendingApplication ? (
          <PendingProviderCard profile={me.provider} />
        ) : (
          <ApplyProviderForm />
        )}
      </div>
    </div>
  )
}

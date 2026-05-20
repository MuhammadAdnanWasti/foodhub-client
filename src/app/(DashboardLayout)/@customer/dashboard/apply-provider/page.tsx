import { getMe } from "@/services/auth"
import { ApplyProviderForm } from "@/components/modules/provider/ApplyProviderForm"
import { PendingProviderCard } from "@/components/modules/provider/PendingProviderCard"

export default async function ApplyProviderPage() {
  const me = await getMe()
  const hasPendingApplication = me?.role === "CUSTOMER" && !!me?.provider

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Become a Provider</h1>
        <p className="text-sm text-gray-500 mt-1">
          Apply to list your restaurant and start selling on FoodHub
        </p>
      </div>

      {hasPendingApplication ? (
        <PendingProviderCard profile={me.provider} />
      ) : (
        <ApplyProviderForm />
      )}
    </div>
  )
}

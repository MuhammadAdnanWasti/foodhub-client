import { getMe } from "@/services/auth"
import { ProviderProfileCard } from "@/components/modules/provider/ProviderProfileCard"

export default async function ProviderProfilePage() {
  const me = await getMe()
  const profile = me?.provider

  if (!profile) {
    return (
      <div className="p-6">
        <p className="text-gray-500">No provider profile found.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Your restaurant details</p>
      </div>

      <ProviderProfileCard
        restaurantName={profile.restaurantName}
        address={profile.address}
        phone={profile.phone}
        createdAt={profile.createdAt}
        ownerName={me?.name ?? ""}
        ownerEmail={me?.email ?? ""}
      />
    </div>
  )
}

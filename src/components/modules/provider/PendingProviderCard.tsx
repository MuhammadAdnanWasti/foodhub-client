import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ProviderProfile = {
  restaurantName: string
  address: string
  phone: string
  createdAt?: string
}

type PendingProviderCardProps = {
  profile: ProviderProfile
}

export function PendingProviderCard({ profile }: PendingProviderCardProps) {
  return (
    <Card className="w-full max-w-lg border border-amber-200 bg-amber-50 rounded-2xl shadow-sm">
      <CardHeader className="pb-3 pt-6 px-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <span className="text-xl">⏳</span>
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-amber-900">
              Application Under Review
            </CardTitle>
            <CardDescription className="text-amber-700 text-sm">
              An admin will approve or reject your request soon
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 space-y-3">
        <div className="rounded-xl bg-white border border-amber-100 divide-y divide-amber-100">
          <Row label="Restaurant" value={profile.restaurantName} />
          <Row label="Address" value={profile.address} />
          <Row label="Phone" value={profile.phone} />
          {profile.createdAt && (
            <Row
              label="Applied on"
              value={new Date(profile.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <span className="text-sm text-gray-800 font-medium">{value}</span>
    </div>
  )
}

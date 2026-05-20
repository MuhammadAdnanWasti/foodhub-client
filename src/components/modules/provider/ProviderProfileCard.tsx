import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

type Props = {
  restaurantName: string
  address: string
  phone: string
  createdAt?: string
  ownerName: string
  ownerEmail: string
}

export function ProviderProfileCard({
  restaurantName,
  address,
  phone,
  createdAt,
  ownerName,
  ownerEmail,
}: Props) {
  return (
    <Card className="w-full max-w-lg border border-gray-100 rounded-2xl shadow-sm">
      <CardHeader className="pb-3 pt-6 px-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <span className="text-xl">🏪</span>
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {restaurantName}
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Restaurant profile
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 space-y-3">
        <div className="rounded-xl bg-gray-50 border border-gray-100 divide-y divide-gray-100">
          <Row label="Restaurant" value={restaurantName} />
          <Row label="Address" value={address} />
          <Row label="Phone" value={phone} />
          <Row label="Owner" value={ownerName} />
          <Row label="Email" value={ownerEmail} />
          {createdAt && (
            <Row
              label="Member since"
              value={new Date(createdAt).toLocaleDateString("en-US", {
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

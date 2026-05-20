import { getMe } from "@/services/auth"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <span className="text-sm text-gray-800 font-medium">{value}</span>
    </div>
  )
}

export default async function CustomerProfilePage() {
  const me = await getMe()

  if (!me) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Unable to load profile. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Your account information</p>
      </div>

      <Card className="w-full max-w-lg border border-gray-100 rounded-2xl shadow-sm">
        <CardHeader className="pb-3 pt-6 px-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl font-bold text-orange-600">
              {me.name?.slice(0, 1).toUpperCase() ?? "?"}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">{me.name}</CardTitle>
              <CardDescription className="text-gray-500 text-sm">Customer Account</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <div className="rounded-xl bg-gray-50 border border-gray-100 divide-y divide-gray-100">
            <InfoRow label="Full Name" value={me.name ?? "—"} />
            <InfoRow label="Email" value={me.email ?? "—"} />
            <InfoRow label="Role" value={me.role ?? "CUSTOMER"} />
            {me.createdAt && (
              <InfoRow
                label="Member since"
                value={new Date(me.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { getProviderApplications } from "@/services/admin"
import { ProviderApplicationsTable } from "@/components/modules/admin/ProviderApplicationsTable"

export default async function AdminDashboard() {
  const res = await getProviderApplications()
  const applications = res?.data ?? []

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Review and manage provider applications</p>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-700">
            Provider Applications
          </h2>
          {applications.length > 0 && (
            <span className="text-xs bg-orange-100 text-orange-700 font-medium px-2.5 py-1 rounded-full">
              {applications.length} pending
            </span>
          )}
        </div>
        <ProviderApplicationsTable applications={applications} />
      </div>
    </div>
  )
}

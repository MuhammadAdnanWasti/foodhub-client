import { getProviderApplications } from "@/services/admin"
import { ProviderApplicationsTable } from "@/components/modules/admin/ProviderApplicationsTable"

export default async function AdminProviderApplicationsPage() {
  const res = await getProviderApplications()
  const applications = res?.data ?? []

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Provider Applications</h1>
          <p className="text-sm text-gray-500 mt-1">Review and approve or reject applications</p>
        </div>
        {applications.length > 0 && (
          <span className="text-xs bg-orange-100 text-orange-700 font-medium px-2.5 py-1 rounded-full">
            {applications.length} pending
          </span>
        )}
      </div>

      <ProviderApplicationsTable applications={applications} />
    </div>
  )
}

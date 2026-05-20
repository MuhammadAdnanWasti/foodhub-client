import { getAllUsers } from "@/services/admin"
import { getMe } from "@/services/auth"
import { UsersTable } from "@/components/modules/admin/UsersTable"

export default async function AdminUsersPage() {
  const [users, me] = await Promise.all([getAllUsers(), getMe()])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500 mt-1">Manage all platform users</p>
      </div>

      <UsersTable users={users} adminId={me?.id ?? ""} />
    </div>
  )
}

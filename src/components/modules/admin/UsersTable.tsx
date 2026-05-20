"use client"

import { Card, CardContent } from "@/components/ui/card"
import { UserStatusToggle } from "@/components/modules/admin/UserStatusToggle"

const roleBadge: Record<string, string> = {
  ADMIN: "bg-purple-100 text-purple-700",
  PROVIDER: "bg-orange-100 text-orange-700",
  CUSTOMER: "bg-blue-100 text-blue-700",
}

const statusBadge: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  SUSPENDED: "bg-red-100 text-red-600",
}

type User = {
  id: string
  name: string
  email: string
  role: "ADMIN" | "PROVIDER" | "CUSTOMER"
  status: "ACTIVE" | "SUSPENDED"
  createdAt: string
}

export function UsersTable({
  users,
  adminId,
}: {
  users: User[]
  adminId: string
}) {
  if (users.length === 0) {
    return (
      <Card className="border border-gray-100 rounded-2xl shadow-sm">
        <CardContent className="py-16 flex flex-col items-center gap-3 text-center">
          <span className="text-4xl">👥</span>
          <p className="text-base font-medium text-gray-600">No users found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Joined</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
              <td className="px-4 py-3 text-gray-500">{user.email}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadge[user.role] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[user.status] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500 text-xs">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-3 text-right">
                {user.id !== adminId && (
                  <UserStatusToggle userId={user.id} currentStatus={user.status} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

"use client"

import * as React from "react"
import { toast } from "sonner"
import { useRouter } from "next/dist/client/components/navigation"
import { approveProviderApplication, rejectProviderApplication } from "@/services/admin"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Application = {
  id: string
  restaurantName: string
  address: string
  phone: string
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
}

type Props = {
  applications: Application[]
}

export function ProviderApplicationsTable({ applications }: Props) {
  const router = useRouter()
  const [loadingId, setLoadingId] = React.useState<string | null>(null)

  async function handleApprove(id: string) {
    setLoadingId(id + "-approve")
    try {
      const result = await approveProviderApplication(id)
      if (result.success) {
        toast.success("Application approved. User is now a provider.")
        router.refresh()
      } else {
        toast.error(result.message || "Failed to approve.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setLoadingId(null)
    }
  }

  async function handleReject(id: string) {
    setLoadingId(id + "-reject")
    try {
      const result = await rejectProviderApplication(id)
      if (result.success) {
        toast.success("Application rejected.")
        router.refresh()
      } else {
        toast.error(result.message || "Failed to reject.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setLoadingId(null)
    }
  }

  if (applications.length === 0) {
    return (
      <Card className="border border-gray-100 rounded-2xl shadow-sm">
        <CardContent className="py-16 flex flex-col items-center gap-3 text-center">
          <span className="text-4xl">📭</span>
          <p className="text-base font-medium text-gray-600">No pending applications</p>
          <p className="text-sm text-gray-400">New applications will appear here</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {applications.map((app) => (
        <Card key={app.id} className="border border-gray-100 rounded-2xl shadow-sm">
          <CardHeader className="pb-2 pt-4 px-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base font-semibold text-gray-900">
                  {app.restaurantName}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 mt-0.5">
                  {app.user.name} &bull; {app.user.email}
                </CardDescription>
              </div>
              <span className="shrink-0 text-xs bg-amber-100 text-amber-700 font-medium px-2.5 py-1 rounded-full">
                Pending
              </span>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wide">Address</span>
                <p className="text-gray-700 mt-0.5">{app.address}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wide">Phone</span>
                <p className="text-gray-700 mt-0.5">{app.phone}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wide">Applied</span>
                <p className="text-gray-700 mt-0.5">
                  {new Date(app.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                onClick={() => handleApprove(app.id)}
                disabled={loadingId === app.id + "-approve"}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl"
              >
                {loadingId === app.id + "-approve" ? "Approving..." : "Approve"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReject(app.id)}
                disabled={loadingId === app.id + "-reject"}
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
              >
                {loadingId === app.id + "-reject" ? "Rejecting..." : "Reject"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

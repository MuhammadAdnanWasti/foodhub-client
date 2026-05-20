"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { updateUserStatus } from "@/services/admin"

type Props = {
  userId: string
  currentStatus: "ACTIVE" | "SUSPENDED"
}

export function UserStatusToggle({ userId, currentStatus }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleToggle() {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
    setLoading(true)
    try {
      const result = await updateUserStatus(userId, newStatus)
      if (result.success) {
        toast.success(newStatus === "SUSPENDED" ? "User suspended." : "User reactivated.")
        router.refresh()
      } else {
        toast.error(result.message || "Failed to update user status.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleToggle}
      disabled={loading}
      className={
        currentStatus === "ACTIVE"
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-green-200 text-green-600 hover:bg-green-50"
      }
    >
      {loading ? "Updating..." : currentStatus === "ACTIVE" ? "Suspend" : "Reactivate"}
    </Button>
  )
}

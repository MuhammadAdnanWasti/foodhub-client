"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UtensilsCrossedIcon } from "lucide-react"
import { getNavItemsByRole } from "@/components/sidebar-nav-config"

type UserProp = {
  id: string
  email: string
  role: "ADMIN" | "PROVIDER" | "CUSTOMER"
} | null

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: UserProp }) {
  const navItems = getNavItemsByRole(user?.role)

  const emailLocal = user?.email?.split("@")[0] ?? ""
  const initials = emailLocal.slice(0, 2).toUpperCase()

  const navUser = {
    name: emailLocal,
    email: user?.email ?? "",
    avatar: "",
    initials,
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <UtensilsCrossedIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">FoodHub</span>
                  <span className="truncate text-xs capitalize">
                    {user?.role?.toLowerCase() ?? "guest"}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

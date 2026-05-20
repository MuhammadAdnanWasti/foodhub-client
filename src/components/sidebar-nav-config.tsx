import {
  LayoutDashboardIcon,
  UsersIcon,
  ClipboardListIcon,
  TagIcon,
  ShoppingBagIcon,
  UtensilsIcon,
  SearchIcon,
  StarIcon,
  StoreIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  url: string
  icon: React.ReactNode
}

type Role = "ADMIN" | "PROVIDER" | "CUSTOMER"

const navItemsByRole: Record<Role, NavItem[]> = {
  ADMIN: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: <UsersIcon />,
    },
    {
      title: "Provider Applications",
      url: "/dashboard/provider-applications",
      icon: <ClipboardListIcon />,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: <TagIcon />,
    },
    {
      title: "All Orders",
      url: "/dashboard/orders",
      icon: <ShoppingBagIcon />,
    },
  ],
  PROVIDER: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "My Meals",
      url: "/dashboard/meals",
      icon: <UtensilsIcon />,
    },
    {
      title: "My Orders",
      url: "/dashboard/orders",
      icon: <ShoppingBagIcon />,
    },
    {
      title: "My Profile",
      url: "/dashboard/profile",
      icon: <StoreIcon />,
    },
  ],
  CUSTOMER: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Browse Restaurants",
      url: "/#restaurants",
      icon: <SearchIcon />,
    },
    {
      title: "My Cart",
      url: "/dashboard/cart",
      icon: <ShoppingCartIcon />,
    },
    {
      title: "My Orders",
      url: "/dashboard/orders",
      icon: <ShoppingBagIcon />,
    },
    {
      title: "My Reviews",
      url: "/dashboard/reviews",
      icon: <StarIcon />,
    },
    {
      title: "My Profile",
      url: "/dashboard/profile",
      icon: <UserIcon />,
    },
    {
      title: "Become a Provider",
      url: "/dashboard/apply-provider",
      icon: <StoreIcon />,
    },
  ],
}

export function getNavItemsByRole(role?: Role): NavItem[] {
  if (!role) return []
  return navItemsByRole[role] ?? []
}

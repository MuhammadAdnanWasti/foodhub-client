export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PLACED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export type CheckoutSessionResponse = {
  checkoutUrl: string;
  orderId: string;
  paymentId: string;
};

export type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  meal: { name: string };
};

export type Order = {
  id: string;
  status: OrderStatus | string;
  totalPrice: number;
  deliveryAddress: string;
  createdAt: string;
  provider: { restaurantName: string };
  orderItems: OrderItem[];
};

export const STATUS_BADGE: Record<string, string> = {
  PENDING_PAYMENT: "bg-amber-100 text-amber-700",
  PLACED: "bg-blue-100 text-blue-700",
  PREPARING: "bg-yellow-100 text-yellow-700",
  READY: "bg-green-100 text-green-700",
  DELIVERED: "bg-gray-100 text-gray-600",
  CANCELLED: "bg-red-100 text-red-600",
};

export const STATUS_LABEL: Record<string, string> = {
  PENDING_PAYMENT: "Awaiting Payment",
  PLACED: "Placed",
  PREPARING: "Preparing",
  READY: "Ready",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const CANCELLABLE_STATUSES = ["PENDING_PAYMENT", "PLACED"] as const;

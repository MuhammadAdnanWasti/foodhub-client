"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { updateCartItemQuantity, removeCartItem, clearCart } from "@/services/cart"
import { checkoutFromCart } from "@/services/order"

const DELIVERY_FEE = 2.99

function isValidImageUrl(src: string | undefined | null) {
  return src && (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/"))
}

type CartItemData = {
  id: string
  mealId: string
  quantity: number
  meal: {
    id: string
    name: string
    price: number
    image: string
    provider: { restaurantName: string }
  }
}

type CartManagerProps = {
  initialItems: CartItemData[]
}

export function CartManager({ initialItems }: CartManagerProps) {
  const [items, setItems] = useState<CartItemData[]>(initialItems)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const subtotal = items.reduce((s, i) => s + i.meal.price * i.quantity, 0)
  const totalQty = items.reduce((s, i) => s + i.quantity, 0)
  const grandTotal = subtotal + DELIVERY_FEE

  const handleQuantityChange = (mealId: string, newQty: number) => {
    startTransition(async () => {
      if (newQty <= 0) {
        const result = await removeCartItem(mealId)
        if (result.success) {
          setItems((prev) => prev.filter((i) => i.mealId !== mealId))
        } else {
          toast.error(result.message || "Failed to remove item")
        }
      } else {
        const result = await updateCartItemQuantity(mealId, newQty)
        if (result.success) {
          setItems((prev) => prev.map((i) => i.mealId === mealId ? { ...i, quantity: newQty } : i))
        } else {
          toast.error(result.message || "Failed to update cart")
        }
      }
    })
  }

  const handleRemove = (mealId: string) => {
    startTransition(async () => {
      const result = await removeCartItem(mealId)
      if (result.success) {
        setItems((prev) => prev.filter((i) => i.mealId !== mealId))
      } else {
        toast.error(result.message || "Failed to remove item")
      }
    })
  }

  const handleClearCart = () => {
    if (!confirm("Clear your entire cart?")) return
    startTransition(async () => {
      const result = await clearCart()
      if (result.success) {
        setItems([])
        toast.success("Cart cleared.")
      } else {
        toast.error(result.message || "Failed to clear cart")
      }
    })
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 5) {
      toast.error("Please enter a valid delivery address (min 5 characters)")
      return
    }
    setCheckoutLoading(true)
    try {
      const result = await checkoutFromCart(deliveryAddress.trim())
      if (result.success && result.data?.checkoutUrl) {
        sessionStorage.setItem("pendingOrderId", result.data.orderId)
        window.location.href = result.data.checkoutUrl
        return
      }
      toast.error(result.message || "Failed to start checkout")
    } catch {
      toast.error("An error occurred while starting checkout")
    } finally {
      setCheckoutLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <Card className="border border-gray-100 rounded-2xl shadow-sm">
        <CardContent className="py-20 flex flex-col items-center gap-3 text-center">
          <ShoppingCart className="size-12 text-gray-300" />
          <p className="text-base font-medium text-gray-600">Your cart is empty</p>
          <p className="text-sm text-gray-400">Add items from a restaurant menu to get started</p>
          <Link href="/#restaurants">
            <Button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white">Browse Restaurants</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  const restaurantName = items[0]?.meal?.provider?.restaurantName

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-3">
        <div className="flex items-center justify-between mb-2">
          {restaurantName && (
            <p className="text-sm text-gray-500">
              From: <span className="font-medium text-gray-700">{restaurantName}</span>
            </p>
          )}
          <button
            type="button"
            onClick={handleClearCart}
            disabled={isPending}
            className="text-xs text-red-400 hover:text-red-600 hover:underline transition-colors"
          >
            Clear all
          </button>
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-sm transition-shadow"
          >
            {/* Image */}
            <div className="w-16 h-16 rounded-xl bg-orange-50 relative overflow-hidden shrink-0 flex items-center justify-center">
              {isValidImageUrl(item.meal.image) ? (
                <Image src={item.meal.image} alt={item.meal.name} fill className="object-cover" sizes="64px" />
              ) : (
                <span className="text-2xl">🍽️</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{item.meal.name}</p>
              <p className="text-sm text-orange-500 font-semibold">${item.meal.price.toFixed(2)}</p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuantityChange(item.mealId, item.quantity - 1)}
                disabled={isPending}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-orange-100 text-gray-700 flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                type="button"
                onClick={() => handleQuantityChange(item.mealId, item.quantity + 1)}
                disabled={isPending}
                className="w-7 h-7 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <Plus className="size-3.5" />
              </button>
            </div>

            {/* Line total */}
            <div className="w-16 text-right shrink-0">
              <p className="text-sm font-bold text-gray-900">
                ${(item.meal.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() => handleRemove(item.mealId)}
              disabled={isPending}
              className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary + Checkout */}
      <div className="lg:col-span-1">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4 sticky top-6">
          <h3 className="font-semibold text-gray-900 text-base">Order Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Items ({totalQty})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery fee</span>
              <span>${DELIVERY_FEE.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleCheckout} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <Input
                placeholder="Enter your delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="h-10 text-sm"
                required
                minLength={5}
              />
            </div>
            <Button
              type="submit"
              disabled={checkoutLoading || items.length === 0}
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl"
            >
              {checkoutLoading ? "Redirecting to payment..." : `Proceed to Payment • $${grandTotal.toFixed(2)}`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/dist/client/components/navigation"
import { registerUser } from "@/services/auth"

const baseSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters.").max(100),
  isProvider: z.boolean().default(false),
  restaurantName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
}).refine(
  (d) => !d.isProvider || (!!d.restaurantName && d.restaurantName.length >= 2),
  { message: "Restaurant name is required.", path: ["restaurantName"] }
).refine(
  (d) => !d.isProvider || (!!d.address && d.address.length >= 5),
  { message: "Address is required.", path: ["address"] }
).refine(
  (d) => !d.isProvider || (!!d.phone && d.phone.length >= 5),
  { message: "Phone number is required.", path: ["phone"] }
)

type FormValues = z.infer<typeof baseSchema>

export function RegisterForm() {
  const router = useRouter()
  const [isProvider, setIsProvider] = React.useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isProvider: false,
      restaurantName: "",
      address: "",
      phone: "",
    },
  })

  function handleTabChange(value: boolean) {
    setIsProvider(value)
    form.setValue("isProvider", value)
    form.clearErrors()
  }

  async function onSubmit(data: FormValues) {
    try {
      const result = await registerUser(data)
      if (result.success) {
        toast.success(data.isProvider ? "Restaurant registered successfully!" : "Account created successfully!")
        form.reset()
        router.push("/dashboard")
      } else {
        toast.error(result.message || "Registration failed.")
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while registering.")
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Brand header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500 shadow-lg shadow-orange-200 mb-1">
          <span className="text-3xl">🍔</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">FoodHub</h1>
        <p className="text-sm text-gray-500">Delicious food, delivered fast</p>
      </div>

      <Card className="w-full shadow-xl border-0 rounded-2xl overflow-hidden">
        <CardHeader className="pb-2 pt-6 px-6">
          <CardTitle className="text-xl font-semibold text-gray-900">Create an account</CardTitle>
          <CardDescription className="text-gray-500">
            Join as a customer or list your restaurant
          </CardDescription>
          {/* Role toggle */}
          <div className="mt-3 flex rounded-xl border border-gray-200 p-1 bg-gray-50">
            <button
              type="button"
              onClick={() => handleTabChange(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                !isProvider
                  ? "bg-white shadow-sm text-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => handleTabChange(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                isProvider
                  ? "bg-white shadow-sm text-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Restaurant Owner
            </button>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-4 pt-3">
          <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...form.register("isProvider")} />
            <FieldGroup>
              {/* Common fields */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-name">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="register-name"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="name"
                      className="h-11"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-email">Email Address</FieldLabel>
                    <Input
                      {...field}
                      id="register-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-11"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="register-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="h-11"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Restaurant fields — only when isProvider */}
              {isProvider && (
                <>
                  <div className="border-t border-gray-100 pt-3 mt-1">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
                      Restaurant Details
                    </p>
                  </div>
                  <Controller
                    name="restaurantName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="register-restaurant">Restaurant Name</FieldLabel>
                        <Input
                          {...field}
                          id="register-restaurant"
                          type="text"
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. The Burger House"
                          className="h-11"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    name="address"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="register-address">Address</FieldLabel>
                        <Input
                          {...field}
                          id="register-address"
                          type="text"
                          aria-invalid={fieldState.invalid}
                          placeholder="123 Main St, Dhaka"
                          className="h-11"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="register-phone">Phone Number</FieldLabel>
                        <Input
                          {...field}
                          id="register-phone"
                          type="tel"
                          aria-invalid={fieldState.invalid}
                          placeholder="+880 1XXXXXXXXX"
                          className="h-11"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </>
              )}
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 px-6 pb-6 pt-2">
          <Button
            type="submit"
            form="register-form"
            className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md shadow-orange-100 transition-colors"
          >
            {isProvider ? "Register Restaurant" : "Create Account"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full h-9 text-sm text-gray-500 hover:text-gray-700"
            onClick={() => form.reset()}
          >
            Clear fields
          </Button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-orange-500 hover:text-orange-600 hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

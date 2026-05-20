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
import { loginUser } from "@/services/auth"
import { useRouter } from "next/dist/client/components/navigation"

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password must be at most 100 characters."),
})

export function LoginForm() {
  const router= useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const result = await loginUser(data);
      // Handle successful login (e.g., store token, redirect user)
      toast.success("Login successful!");
      router.push("/");
    } catch (error:any) {
      toast.error(error.message || "An error occurred while logging in.")
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
        <CardHeader className="pb-4 pt-6 px-6">
          <CardTitle className="text-xl font-semibold text-gray-900">Welcome back</CardTitle>
          <CardDescription className="text-gray-500">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-4">
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-email">
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-11"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="h-11"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 px-6 pb-6 pt-2">
          <Button
            type="submit"
            form="form-rhf-demo"
            className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md shadow-orange-100 transition-colors"
          >
            Sign In
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
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-orange-500 hover:text-orange-600 hover:underline transition-colors"
            >
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

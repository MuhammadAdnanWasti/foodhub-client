"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useRouter } from "next/dist/client/components/navigation"

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
import { applyToBecomeProvider } from "@/services/provider"

const formSchema = z.object({
  restaurantName: z.string().min(2, "Restaurant name must be at least 2 characters."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  phone: z.string().min(5, "Phone number must be at least 5 characters."),
})

type FormValues = z.infer<typeof formSchema>

export function ApplyProviderForm() {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { restaurantName: "", address: "", phone: "" },
  })

  async function onSubmit(data: FormValues) {
    try {
      const result = await applyToBecomeProvider(data)
      if (result.success) {
        toast.success("Application submitted! An admin will review it shortly.")
        router.refresh()
      } else {
        toast.error(result.message || "Failed to submit application.")
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred.")
    }
  }

  return (
    <Card className="w-full max-w-lg shadow-md border border-gray-100 rounded-2xl">
      <CardHeader className="pb-3 pt-6 px-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <span className="text-xl">🏪</span>
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Become a Restaurant Owner
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Submit your restaurant details for admin review
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-4">
        <form id="apply-provider-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="restaurantName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="apply-restaurant">Restaurant Name</FieldLabel>
                  <Input
                    {...field}
                    id="apply-restaurant"
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
                  <FieldLabel htmlFor="apply-address">Address</FieldLabel>
                  <Input
                    {...field}
                    id="apply-address"
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
                  <FieldLabel htmlFor="apply-phone">Phone Number</FieldLabel>
                  <Input
                    {...field}
                    id="apply-phone"
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    placeholder="+880 1XXXXXXXXX"
                    className="h-11"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-2">
        <Button
          type="submit"
          form="apply-provider-form"
          disabled={form.formState.isSubmitting}
          className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md shadow-orange-100 transition-colors"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </CardFooter>
    </Card>
  )
}

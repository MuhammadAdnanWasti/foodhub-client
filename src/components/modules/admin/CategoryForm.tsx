"use client"

import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { createCategory, updateCategory } from "@/services/categories"

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must not exceed 500 characters"),
})

type FormValues = z.infer<typeof schema>

type Props = {
  mode: "create" | "edit"
  categoryId?: string
  defaultValues?: Partial<FormValues>
}

export function CategoryForm({ mode, categoryId, defaultValues }: Props) {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
    },
  })

  async function onSubmit(data: FormValues) {
    try {
      const result =
        mode === "edit" && categoryId
          ? await updateCategory(categoryId, data)
          : await createCategory(data)

      if (result.success) {
        toast.success(mode === "edit" ? "Category updated." : "Category created.")
        router.push("/dashboard/categories")
      } else {
        toast.error(result.message || "Something went wrong.")
      }
    } catch {
      toast.error("An error occurred.")
    }
  }

  return (
    <Card className="w-full max-w-lg shadow-md border border-gray-100 rounded-2xl">
      <CardHeader className="px-6 pt-6 pb-3">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <span className="text-xl">🏷️</span>
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {mode === "edit" ? "Edit Category" : "Add New Category"}
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              {mode === "edit"
                ? "Update the category details below"
                : "Create a new category for meals"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <form id="category-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="cat-name">Category Name</FieldLabel>
                  <Input
                    {...field}
                    id="cat-name"
                    placeholder="e.g. Burgers"
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="cat-description">Description</FieldLabel>
                  <Input
                    {...field}
                    id="cat-description"
                    placeholder="Short description of this category"
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-11"
              onClick={() => router.push("/dashboard/categories")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="category-form"
              disabled={form.formState.isSubmitting}
              className="flex-1 h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl"
            >
              {form.formState.isSubmitting
                ? mode === "edit"
                  ? "Saving..."
                  : "Creating..."
                : mode === "edit"
                  ? "Save Changes"
                  : "Create Category"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

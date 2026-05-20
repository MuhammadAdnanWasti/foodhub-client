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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createMeal, updateMeal } from "@/services/provider"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  image: z.string().url("Please enter a valid image URL"),
  categoryName: z.string().min(1, "Please select a category"),
})

type FormValues = z.infer<typeof schema>

type Category = { id: string; name: string }

type Props = {
  mode: "create" | "edit"
  mealId?: string
  categories: Category[]
  defaultValues?: Partial<FormValues>
}

export function MealForm({ mode, mealId, categories, defaultValues }: Props) {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      price: defaultValues?.price ?? undefined,
      image: defaultValues?.image ?? "",
      categoryName: defaultValues?.categoryName ?? "",
    },
  })

  async function onSubmit(data: FormValues) {
    try {
      const result =
        mode === "edit" && mealId
          ? await updateMeal(mealId, data)
          : await createMeal(data)

      if (result.success) {
        toast.success(mode === "edit" ? "Meal updated." : "Meal created.")
        router.push("/dashboard/meals")
      } else {
        toast.error(result.message || "Something went wrong.")
      }
    } catch {
      toast.error("An error occurred.")
    }
  }

  return (
    <Card className="w-full max-w-xl shadow-md border border-gray-100 rounded-2xl">
      <CardHeader className="px-6 pt-6 pb-3">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <span className="text-xl">🍴</span>
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {mode === "edit" ? "Edit Meal" : "Add New Meal"}
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              {mode === "edit" ? "Update the meal details below" : "Fill in the details for your new menu item"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <form id="meal-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="meal-name">Meal Name</FieldLabel>
                  <Input
                    {...field}
                    id="meal-name"
                    placeholder="e.g. Grilled Chicken Burger"
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
                  <FieldLabel htmlFor="meal-description">Description</FieldLabel>
                  <Input
                    {...field}
                    id="meal-description"
                    placeholder="Short description of the meal"
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="meal-price">Price ($)</FieldLabel>
                  <Input
                    {...field}
                    id="meal-price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="9.99"
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="meal-image">Image URL</FieldLabel>
                  <Input
                    {...field}
                    id="meal-image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="categoryName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="meal-category">Category</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="meal-category" className="h-11" aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              onClick={() => router.push("/dashboard/meals")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="meal-form"
              disabled={form.formState.isSubmitting}
              className="flex-1 h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl"
            >
              {form.formState.isSubmitting
                ? mode === "edit" ? "Saving..." : "Creating..."
                : mode === "edit" ? "Save Changes" : "Create Meal"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

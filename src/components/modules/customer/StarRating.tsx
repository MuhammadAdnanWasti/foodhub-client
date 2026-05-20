"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type StarRatingProps = {
    value: number
    onChange?: (val: number) => void
    readonly?: boolean
    size?: "sm" | "md" | "lg"
}

export function StarRating({ value, onChange, readonly = false, size = "md" }: StarRatingProps) {
    const sizeClass = size === "sm" ? "size-3.5" : size === "lg" ? "size-6" : "size-5"

    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => !readonly && onChange?.(star)}
                    disabled={readonly}
                    className={cn(
                        "transition-colors",
                        readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
                    )}
                    aria-label={`${star} star${star !== 1 ? "s" : ""}`}
                >
                    <Star
                        className={cn(
                            sizeClass,
                            star <= value ? "fill-amber-400 text-amber-400" : "fill-transparent text-gray-300"
                        )}
                    />
                </button>
            ))}
        </div>
    )
}

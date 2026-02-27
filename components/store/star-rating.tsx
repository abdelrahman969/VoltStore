"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  max?: number
  size?: "sm" | "md"
  showValue?: boolean
  reviewCount?: number
}

export function StarRating({ rating, max = 5, size = "sm", showValue = false, reviewCount }: StarRatingProps) {
  const iconSize = size === "sm" ? "size-3.5" : "size-4"
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              iconSize,
              i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : i < rating ? "fill-yellow-400/50 text-yellow-400" : "text-muted-foreground/30"
            )}
          />
        ))}
      </div>
      {showValue && <span className="text-xs font-medium text-muted-foreground">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && <span className="text-xs text-muted-foreground">({reviewCount})</span>}
    </div>
  )
}

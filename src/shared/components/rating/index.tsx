import { cva } from "class-variance-authority";
import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
  rating: number;
  reviews?: number; // Number of reviews, optional
  variant?: "compact" | "extended";
}

export const Rating = ({ className, rating, reviews, variant }: IProps) => {
  if (!rating && !reviews) return null;

  const variants = cva("flex items-center gap-1 font-medium", {
    defaultVariants: {
      variant: "compact",
    },
    variants: {
      variant: {
        compact: "text-sm",
        extended: "text-base",
      },
    },
  });

  if (variant === "extended") {
    return (
      <div className={cn(variants({ variant }), className)}>
        {[...Array(5)].map((_, index) => (
          <StarIcon
            className={cn(
              "size-4",
              index < Math.floor(rating)
                ? "fill-primary text-primary"
                : "fill-gray-300 text-gray-300"
            )}
            key={rating + index}
          />
        ))}
        {reviews !== undefined && (
          <span className="text-xl">
            {reviews} {reviews === 1 ? "rating" : "ratings"}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn(variants({ variant }), className)}>
      <StarIcon className="fill-foreground size-3.5" />
      <span>{rating.toFixed(1)}</span>
      {reviews && <span>({reviews})</span>}
    </div>
  );
};

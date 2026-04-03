"use client";

interface StarRatingProps {
  rating: number;
  ratingCount?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ rating, ratingCount, interactive, onRate, size = "sm" }: StarRatingProps) {
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };

  return (
    <div className="flex items-center gap-1">
      <div className={`flex gap-0.5 ${sizes[size]}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate?.(star)}
            className={`transition-transform ${interactive ? "hover:scale-125 cursor-pointer" : "cursor-default"}`}
            disabled={!interactive}
          >
            <span className={star <= Math.round(rating) ? "text-amber-400" : "text-stone-300 dark:text-stone-600"}>
              ★
            </span>
          </button>
        ))}
      </div>
      {ratingCount !== undefined && (
        <span className="text-xs text-stone-500 dark:text-stone-400">
          {rating.toFixed(1)} ({ratingCount})
        </span>
      )}
    </div>
  );
}

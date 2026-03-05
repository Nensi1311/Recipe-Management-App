"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  count?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: number;
}

export const StarRating = ({
  rating,
  count,
  interactive,
  onRate,
  size = 18,
}: StarRatingProps) => {
  const roundedRating = Math.round(rating);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`transition-transform duration-200 ${
              interactive ? "cursor-pointer hover:scale-125" : "cursor-default"
            }`}
            fill={star <= roundedRating ? "var(--accent)" : "transparent"}
            stroke={
              star <= roundedRating ? "var(--accent)" : "var(--text-muted)"
            }
            onClick={() => interactive && onRate?.(star)}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs font-bold text-text-muted opacity-80 tabular-nums">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
};

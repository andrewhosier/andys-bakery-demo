import React from "react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
};

export default function StarRating({
  rating,
  max = 5,
  size = "md",
}: StarRatingProps) {
  return (
    <span className={`inline-flex gap-0.5 ${sizes[size]}`} aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < Math.round(rating) ? "star-filled" : "star-empty"}>
          ★
        </span>
      ))}
    </span>
  );
}

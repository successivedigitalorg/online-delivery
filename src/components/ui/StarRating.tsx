"use client";

import { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showNumber?: boolean;
  className?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  showNumber = false,
  className = ""
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleMouseEnter = (starRating: number) => {
    if (interactive) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const filled = displayRating >= starValue;
    const halfFilled = !filled && displayRating >= starValue - 0.5;

    let StarIcon = FaRegStar;
    if (filled) {
      StarIcon = FaStar;
    } else if (halfFilled && !interactive) {
      StarIcon = FaStarHalfAlt;
    }

    return (
      <button
        key={index}
        type="button"
        className={`
          ${filled || (interactive && hoverRating >= starValue) ? "text-yellow-400" : "text-gray-300"}
          ${interactive ? "hover:text-yellow-400 cursor-pointer" : "cursor-default"}
          transition-colors duration-150
        `}
        onClick={() => handleStarClick(starValue)}
        onMouseEnter={() => handleMouseEnter(starValue)}
        onMouseLeave={handleMouseLeave}
        disabled={!interactive}
        aria-label={interactive ? `Rate ${starValue} star${starValue !== 1 ? 's' : ''}` : undefined}
      >
        <StarIcon />
      </button>
    );
  };

  return (
    <div className={`flex items-center gap-1 ${sizeClasses[size]} ${className}`}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
      </div>
      {showNumber && (
        <span className="text-gray-600 text-sm ml-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
}
"use client";

import { Review } from "@/lib/types";
import StarRating from "./StarRating";
import { FaCheckCircle, FaThumbsUp, FaFlag } from "react-icons/fa";

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
  onReport?: (reviewId: string) => void;
}

export default function ReviewCard({ review, onHelpful, onReport }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
            {review.userName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900">{review.userName}</h4>
              {review.verified && (
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <FaCheckCircle className="w-3 h-3" />
                  <span>Verified Purchase</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={review.rating} size="sm" />
              <span className="text-gray-500 text-sm">{formatDate(review.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      </div>

      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto">
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          {onHelpful && (
            <button
              onClick={() => onHelpful(review.id)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaThumbsUp className="w-4 h-4" />
              <span className="text-sm">
                Helpful {review.helpful ? `(${review.helpful})` : ''}
              </span>
            </button>
          )}
        </div>

        {onReport && (
          <button
            onClick={() => onReport(review.id)}
            className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaFlag className="w-3 h-3" />
            <span className="text-sm">Report</span>
          </button>
        )}
      </div>
    </div>
  );
}
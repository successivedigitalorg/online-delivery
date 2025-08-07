"use client";

import { useState } from "react";
import { Review, ReviewStats } from "@/lib/types";
import ReviewCard from "./ReviewCard";
import StarRating from "./StarRating";
import { FaFilter, FaSort } from "react-icons/fa";

interface ReviewsListProps {
  reviews: Review[];
  stats: ReviewStats;
  productName?: string;
}

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1';

export default function ReviewsList({ reviews, stats, productName }: ReviewsListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleHelpful = (reviewId: string) => {
    // In a real app, this would make an API call
    console.log('Marked review as helpful:', reviewId);
  };

  const handleReport = (reviewId: string) => {
    // In a real app, this would make an API call
    console.log('Reported review:', reviewId);
  };

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    if (filterBy === 'all') return true;
    return review.rating === parseInt(filterBy);
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return (b.helpful || 0) - (a.helpful || 0);
      default:
        return 0;
    }
  });

  // Limit initial display
  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3);
  const hasMoreReviews = sortedReviews.length > 3;

  if (reviews.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Reviews Yet</h3>
        <p className="text-gray-500">Be the first to review {productName}!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-4xl font-bold text-gray-900">
                {stats.averageRating.toFixed(1)}
              </span>
              <div>
                <StarRating rating={stats.averageRating} size="lg" />
                <p className="text-gray-600 text-sm mt-1">
                  Based on {stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center gap-2 text-sm">
                  <span className="w-8 text-right">{rating}</span>
                  <StarRating rating={1} maxRating={1} size="sm" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-gray-600">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All ratings</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <FaSort className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
              <option value="helpful">Most helpful</option>
            </select>
          </div>
        </div>

        <p className="text-gray-600 text-sm">
          Showing {displayedReviews.length} of {sortedReviews.length} review{sortedReviews.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onHelpful={handleHelpful}
            onReport={handleReport}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreReviews && !showAllReviews && (
        <div className="text-center">
          <button
            onClick={() => setShowAllReviews(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Show All {sortedReviews.length} Reviews
          </button>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { Review } from "@/lib/types";
import StarRating from "./StarRating";
import { FaCamera, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface ReviewFormProps {
  productId: number;
  productName: string;
  onSubmit: (review: Omit<Review, 'id' | 'createdAt' | 'helpful'>) => void;
  onCancel: () => void;
}

export default function ReviewForm({ productId, productName, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you would upload these to a server
      // For now, we'll just show a placeholder
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 3)); // Limit to 3 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      toast.error('Please write a review');
      return;
    }
    
    if (!userName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReview: Omit<Review, 'id' | 'createdAt' | 'helpful'> = {
        productId,
        userId: 'current-user', // In a real app, this would come from authentication
        userName: userName.trim(),
        rating,
        comment: comment.trim(),
        images: images.length > 0 ? images : undefined,
        verified: false, // New reviews start as unverified
        reported: false
      };
      
      onSubmit(newReview);
      toast.success('Review submitted successfully!');
    } catch {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Write a Review for {productName}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter your name"
            disabled={isSubmitting}
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex items-center gap-2">
            <StarRating 
              rating={rating} 
              interactive 
              onRatingChange={setRating}
              size="lg"
            />
            {rating > 0 && (
              <span className="text-gray-600 ml-2">
                {rating} star{rating !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Share your experience with this product..."
            disabled={isSubmitting}
          />
          <div className="text-sm text-gray-500 mt-1">
            {comment.length}/500 characters
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Photos (Optional)
          </label>
          <div className="space-y-3">
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-colors">
              <div className="flex items-center gap-2 text-gray-600">
                <FaCamera />
                <span>Upload photos (Max 3)</span>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isSubmitting || images.length >= 3}
              />
            </label>
            
            {images.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      disabled={isSubmitting}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="text-gray-600 hover:text-gray-800 px-4 py-2 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
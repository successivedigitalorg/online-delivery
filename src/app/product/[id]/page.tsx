"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, getReviewsByProductId, getReviewStats } from "@/lib/data";
import { Product, Review, ReviewStats } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "react-hot-toast";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import StarRating from "@/components/ui/StarRating";
import ReviewsList from "@/components/ui/ReviewsList";
import ReviewForm from "@/components/ui/ReviewForm";
import { FaPlus, FaArrowLeft, FaPen } from "react-icons/fa";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (productId) {
      const productData = getProductById(productId);
      const reviewsData = getReviewsByProductId(productId);
      const statsData = getReviewStats(productId);
      
      setProduct(productData || null);
      setReviews(reviewsData);
      setReviewStats(statsData);
      setLoading(false);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`Added ${product.name} to cart`);
    }
  };

  const handleReviewSubmit = (newReview: Omit<Review, 'id' | 'createdAt' | 'helpful'>) => {
    // In a real app, this would make an API call to save the review
    const reviewWithMetadata: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      helpful: 0
    };
    
    setReviews(prev => [reviewWithMetadata, ...prev]);
    setShowReviewForm(false);
    
    // Recalculate stats (in a real app, this would be done on the backend)
    const updatedReviews = [reviewWithMetadata, ...reviews];
    const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / updatedReviews.length;
    
    const ratingDistribution = updatedReviews.reduce((dist, review) => {
      dist[review.rating as keyof typeof dist]++;
      return dist;
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    
    setReviewStats({
      averageRating,
      totalReviews: updatedReviews.length,
      ratingDistribution
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Product Not Found</h1>
          <button
            onClick={() => router.push('/menu')}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <ResponsiveImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.vegetarian && (
              <span className="absolute top-4 right-4 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                Vegetarian
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg">{product.description}</p>
          </div>

          {/* Rating Display */}
          {product.averageRating && product.reviewCount && (
            <div className="flex items-center gap-4">
              <StarRating rating={product.averageRating} size="lg" showNumber />
              <span className="text-gray-600">
                ({product.reviewCount} review{product.reviewCount !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          {/* Price and Add to Cart */}
          <div className="space-y-4">
            <div className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              <FaPlus />
              Add to Cart
            </button>
          </div>

          {/* Product Details */}
          <div className="space-y-3 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900">Product Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Category:</span>
                <span className="ml-2 capitalize font-medium">{product.category}</span>
              </div>
              {product.vegetarian && (
                <div>
                  <span className="text-gray-600">Diet:</span>
                  <span className="ml-2 text-green-600 font-medium">Vegetarian</span>
                </div>
              )}
              {product.popular && (
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2 text-orange-600 font-medium">Popular Item</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <FaPen />
            {showReviewForm ? 'Cancel' : 'Write Review'}
          </button>
        </div>

        {showReviewForm && product && (
          <div className="mb-8">
            <ReviewForm
              productId={product.id}
              productName={product.name}
              onSubmit={handleReviewSubmit}
              onCancel={() => setShowReviewForm(false)}
            />
          </div>
        )}

        {reviewStats && (
          <ReviewsList
            reviews={reviews}
            stats={reviewStats}
            productName={product.name}
          />
        )}
      </div>
    </div>
  );
}
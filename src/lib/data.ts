import { Product, Review, ReviewStats } from "./types";

export const products: Product[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    image: "/pizzas/margherita.svg",
    category: "pizza",
    popular: true,
    vegetarian: true,
    averageRating: 4.5,
    reviewCount: 128
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Pizza with tomato sauce, mozzarella, and pepperoni",
    price: 14.99,
    image: "/pizzas/pepperoni.svg",
    category: "pizza",
    popular: true,
    averageRating: 4.7,
    reviewCount: 245
  },
  {
    id: 3,
    name: "Hawaiian Pizza",
    description: "Pizza with tomato sauce, mozzarella, ham, and pineapple",
    price: 15.99,
    image: "/pizzas/hawaiian.svg",
    category: "pizza",
    averageRating: 3.8,
    reviewCount: 89
  },
  {
    id: 4,
    name: "Veggie Supreme Pizza",
    description: "Pizza with tomato sauce, mozzarella, bell peppers, mushrooms, onions, and olives",
    price: 16.99,
    image: "/pizzas/veggie.svg",
    category: "pizza",
    vegetarian: true,
    averageRating: 4.3,
    reviewCount: 167
  },
  {
    id: 5,
    name: "BBQ Chicken Pizza",
    description: "Pizza with BBQ sauce, mozzarella, chicken, and red onions",
    price: 17.99,
    image: "/pizzas/bbq-chicken.svg",
    category: "pizza",
    popular: true,
    averageRating: 4.6,
    reviewCount: 203
  },
  {
    id: 6,
    name: "French Fries",
    description: "Crispy fried potatoes served with ketchup",
    price: 4.99,
    image: "/sides/fries.svg",
    category: "sides",
    vegetarian: true,
    averageRating: 4.2,
    reviewCount: 312
  },
  {
    id: 7,
    name: "Onion Rings",
    description: "Crispy fried onion rings served with dipping sauce",
    price: 5.99,
    image: "/sides/onion-rings.svg",
    category: "sides",
    vegetarian: true,
    averageRating: 4.0,
    reviewCount: 98
  },
  {
    id: 8,
    name: "Garlic Bread",
    description: "Fresh bread with garlic butter and herbs",
    price: 3.99,
    image: "/sides/garlic-bread.svg",
    category: "sides",
    vegetarian: true,
    popular: true,
    averageRating: 4.4,
    reviewCount: 156
  },
  {
    id: 9,
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 7.99,
    image: "/sides/caesar-salad.svg",
    category: "sides",
    vegetarian: true,
    averageRating: 4.1,
    reviewCount: 87
  },
  {
    id: 10,
    name: "Coca Cola",
    description: "Classic refreshing cola drink",
    price: 2.49,
    image: "/drinks/coke.svg",
    category: "drinks",
    averageRating: 4.3,
    reviewCount: 425
  },
  {
    id: 11,
    name: "Sprite",
    description: "Crisp, lemon-lime soda",
    price: 2.49,
    image: "/drinks/sprite.svg",
    category: "drinks",
    averageRating: 4.2,
    reviewCount: 201
  },
  {
    id: 12,
    name: "Water Bottle",
    description: "Purified bottled water",
    price: 1.99,
    image: "/drinks/water.svg",
    category: "drinks",
    averageRating: 4.0,
    reviewCount: 93
  }
];

export const categories = [
  {
    id: "pizza",
    name: "Pizzas",
    image: "/categories/pizza.svg"
  },
  {
    id: "sides",
    name: "Sides",
    image: "/categories/sides.svg"
  },
  {
    id: "drinks",
    name: "Drinks",
    image: "/categories/drinks.svg"
  }
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function getPopularProducts(): Product[] {
  return products.filter(product => product.popular);
}

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

// Mock review data
export const reviews: Review[] = [
  {
    id: "rev-1",
    productId: 1,
    orderId: "ORD-1001",
    userId: "user-1",
    userName: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely perfect! The margherita pizza arrived hot and fresh. The cheese was perfectly melted and the basil was so fragrant. Will definitely order again!",
    createdAt: "2024-01-15T18:30:00Z",
    verified: true,
    helpful: 12
  },
  {
    id: "rev-2",
    productId: 1,
    orderId: "ORD-1002",
    userId: "user-2",
    userName: "Mike Chen",
    rating: 4,
    comment: "Great classic pizza! Good balance of flavors, though I would have liked a bit more basil. Fast delivery too.",
    createdAt: "2024-01-14T19:45:00Z",
    verified: true,
    helpful: 8
  },
  {
    id: "rev-3",
    productId: 2,
    orderId: "ORD-1003",
    userId: "user-3",
    userName: "Emily Davis",
    rating: 5,
    comment: "Best pepperoni pizza in town! The pepperoni has the perfect amount of spice and the crust is crispy. Highly recommend!",
    createdAt: "2024-01-16T20:15:00Z",
    verified: true,
    helpful: 15
  },
  {
    id: "rev-4",
    productId: 2,
    orderId: "ORD-1004",
    userId: "user-4",
    userName: "David Wilson",
    rating: 4,
    comment: "Solid pepperoni pizza. Good quality ingredients and arrived on time. Would order again.",
    createdAt: "2024-01-13T17:20:00Z",
    verified: true,
    helpful: 5
  },
  {
    id: "rev-5",
    productId: 3,
    orderId: "ORD-1005",
    userId: "user-5",
    userName: "Lisa Brown",
    rating: 3,
    comment: "The pineapple was fresh but the combination just isn't for me. Quality was good though.",
    createdAt: "2024-01-12T16:10:00Z",
    verified: true,
    helpful: 3
  },
  {
    id: "rev-6",
    productId: 6,
    orderId: "ORD-1006",
    userId: "user-6",
    userName: "Alex Thompson",
    rating: 4,
    comment: "Crispy and golden fries! They arrived hot and seasoned perfectly. Great side dish.",
    createdAt: "2024-01-17T19:00:00Z",
    verified: true,
    helpful: 7
  }
];

// Helper functions for reviews
export function getReviewsByProductId(productId: number): Review[] {
  return reviews.filter(review => review.productId === productId);
}

export function getReviewStats(productId: number): ReviewStats {
  const productReviews = getReviewsByProductId(productId);
  
  if (productReviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }

  const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / productReviews.length;

  const ratingDistribution = productReviews.reduce((dist, review) => {
    dist[review.rating as keyof typeof dist]++;
    return dist;
  }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  return {
    averageRating,
    totalReviews: productReviews.length,
    ratingDistribution
  };
}

export function getAllReviews(): Review[] {
  return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getRecentReviews(limit: number = 5): Review[] {
  return getAllReviews().slice(0, limit);
}
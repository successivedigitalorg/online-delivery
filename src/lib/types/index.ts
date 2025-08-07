export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  vegetarian?: boolean;
  averageRating?: number;
  reviewCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type PaymentMethod = 'COD' | 'Online';

export interface OrderDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  paymentMethod: PaymentMethod;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
  createdAt: string;
  details: OrderDetails;
  canReview?: boolean;
}

export interface Review {
  id: string;
  productId: number;
  orderId?: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  verified: boolean;
  helpful?: number;
  reported?: boolean;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
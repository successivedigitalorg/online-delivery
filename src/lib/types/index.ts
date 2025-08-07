export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  vegetarian?: boolean;
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
  assignedTo?: string; // Delivery personnel ID
  estimatedDelivery?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
}

export interface DeliveryPersonnel {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'available' | 'busy' | 'offline';
  currentOrders: number;
  totalDeliveries: number;
  rating: number;
}

export interface Analytics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  topProducts: Array<{ productId: number; productName: string; orderCount: number }>;
  busyHours: Array<{ hour: number; orderCount: number }>;
  dailySales: Array<{ date: string; sales: number; orders: number }>;
}
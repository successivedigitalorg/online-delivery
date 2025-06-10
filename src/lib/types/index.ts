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
}
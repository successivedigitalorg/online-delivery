import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, OrderDetails, Product } from "../types";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  orderDetails: OrderDetails | null;
  setOrderDetails: (details: OrderDetails) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      orderDetails: null,
      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            return {
              items: state.items.map(item => 
                item.id === product.id 
                  ? { ...item, quantity: item.quantity + 1 } 
                  : item
              )
            };
          } else {
            return {
              items: [...state.items, { ...product, quantity: 1 }]
            };
          }
        });
      },
      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }));
      },
      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item => 
            item.id === productId ? { ...item, quantity } : item
          )
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
      },
      setOrderDetails: (details: OrderDetails) => {
        set({ orderDetails: details });
      }
    }),
    {
      name: "cart-storage"
    }
  )
);
"use client";

import { useCartStore } from "@/lib/store/cart";
import Link from "next/link";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import ResponsiveImage from "@/components/ui/ResponsiveImage";

export default function Cart() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalPrice 
  } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is empty</p>
        <Link
          href="/menu"
          className="bg-orange-500 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row items-start sm:items-center border-b py-4 gap-4"
            >
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0">
                <div className="w-full h-full">
                  <ResponsiveImage
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-md"
                  />
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-sm sm:text-base truncate">{item.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">${item.price.toFixed(2)}</p>
              </div>
              
              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus size={10} className="sm:text-xs" />
                  </button>
                  <span className="w-6 sm:w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <FaPlus size={10} className="sm:text-xs" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm sm:text-base">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors mt-1"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <FaTrash className="text-xs sm:text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg h-fit sticky top-20">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span>Subtotal</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span>Delivery Fee</span>
            <span>$2.99</span>
          </div>
          <div className="border-t my-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${(getTotalPrice() + 2.99).toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="w-full bg-orange-500 text-white text-center py-2 sm:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors block mt-4 text-sm sm:text-base"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
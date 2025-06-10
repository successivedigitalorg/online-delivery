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
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is empty</p>
        <Link
          href="/menu"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row items-start sm:items-center border-b py-4 gap-4"
            >
              <div className="relative h-20 w-20 flex-shrink-0">
                <div className="w-full h-full">
                  <ResponsiveImage
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-md"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FaMinus size={12} />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  aria-label="Increase quantity"
                >
                  <FaPlus size={12} />
                </button>
              </div>
              <div className="text-right min-w-20">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors mt-1"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery Fee</span>
            <span>$2.99</span>
          </div>
          <div className="border-t my-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${(getTotalPrice() + 2.99).toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="w-full bg-orange-500 text-white text-center py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors block mt-4"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
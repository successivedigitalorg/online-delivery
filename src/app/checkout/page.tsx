"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "react-hot-toast";
import { OrderDetails, PaymentMethod } from "@/lib/types";

export default function Checkout() {
  const router = useRouter();
  const { items, getTotalPrice, setOrderDetails, clearCart } = useCartStore();
  const [formData, setFormData] = useState<OrderDetails>({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "COD",
    specialInstructions: "",
  });

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Save order details to store
    setOrderDetails(formData);
    
    // Create a new order (in a real app, this would send to backend)
    const orderId = "ORD-" + Math.floor(Math.random() * 10000);
    
    // In a real app, we would send the order to a backend here
    toast.success("Order placed successfully!");
    clearCart();
    
    // Redirect to order confirmation
    router.push(`/order?id=${orderId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block mb-1">Delivery Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="specialInstructions" className="block mb-1">Special Instructions</label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
                placeholder="Any special delivery instructions or food preferences..."
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="flex flex-col space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === "COD"}
                    onChange={() => handlePaymentMethodChange("COD")}
                    className="h-4 w-4 text-orange-500"
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer opacity-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === "Online"}
                    onChange={() => handlePaymentMethodChange("Online")}
                    className="h-4 w-4 text-orange-500"
                    disabled
                  />
                  <span>Online Payment (Coming soon)</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.quantity} × {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 mt-4">
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
          </div>
          
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white text-center py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors block mt-4"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Order } from "@/lib/types";
import Link from "next/link";
import { FaCheckCircle, FaPizzaSlice, FaTruck, FaShippingFast } from "react-icons/fa";

function getProgressWidth(status: string): string {
  if (status === "confirmed") return "0%";
  if (status === "preparing") return "33%";
  if (status === "out_for_delivery") return "66%";
  return "100%";
}

function OrderContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // In a real app, we would fetch the order from a backend
  // For this demo, we'll create a mock order
  useEffect(() => {
    if (orderId) {
      setTimeout(() => {
        setOrder({
          id: orderId,
          items: [
            {
              id: 1,
              name: "Margherita Pizza",
              description: "Classic pizza with tomato sauce, mozzarella, and basil",
              price: 12.99,
              image: "/pizzas/margherita.svg",
              category: "pizza",
              popular: true,
              vegetarian: true,
              quantity: 1
            },
            {
              id: 6,
              name: "French Fries",
              description: "Crispy fried potatoes served with ketchup",
              price: 4.99,
              image: "/sides/fries.svg",
              category: "sides",
              vegetarian: true,
              quantity: 1
            }
          ],
          status: "preparing",
          total: 17.98,
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 40 * 60 * 1000).toISOString(),
          details: {
            name: "John Doe",
            phone: "555-123-4567",
            email: "john@example.com",
            address: "123 Main St, City, Country",
            paymentMethod: "COD",
            specialInstructions: "Please ring the doorbell"
          }
        });
        setLoading(false);
      }, 1000);
    }
  }, [orderId]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <p className="mt-4 text-gray-600">Loading your order...</p>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn&apos;t find the order you&apos;re looking for.</p>
        <Link
          href="/menu"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          Go to Menu
        </Link>
      </div>
    );
  }

  const steps = [
    { 
      id: "confirmed", 
      name: "Confirmed", 
      description: "We've received your order", 
      icon: FaCheckCircle,
      complete: true
    },
    { 
      id: "preparing", 
      name: "Preparing", 
      description: "Your order is being prepared fresh", 
      icon: FaPizzaSlice,
      complete: ["preparing", "out_for_delivery", "delivered"].includes(order.status)
    },
    { 
      id: "out_for_delivery", 
      name: "Out for Delivery", 
      description: "Your order is on its way to you", 
      icon: FaShippingFast,
      complete: ["out_for_delivery", "delivered"].includes(order.status)
    },
    { 
      id: "delivered", 
      name: "Delivered", 
      description: "Your order has been delivered. Enjoy!", 
      icon: FaTruck,
      complete: ["delivered"].includes(order.status)
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">Order #{order.id}</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
        </p>
      </div>

      {/* Order Status */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Order Status</h2>
        <div className="relative">
          {/* Mobile Status Display */}
          <div className="flex flex-col space-y-4 sm:hidden">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step.complete
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  <step.icon className="w-4 h-4" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-sm">{step.name}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop Status Display */}
          <div className="hidden sm:block">
            <div className="relative flex items-center justify-between mb-12">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step.complete
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <p className="mt-2 font-medium text-sm">{step.name}</p>
                </div>
              ))}

              {/* Connecting line */}
              <div className="absolute top-5 left-0 transform -translate-y-1/2 w-full h-0.5 bg-gray-200 z-0">
                <div 
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ 
                    width: getProgressWidth(order.status)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Items</h2>
            <div className="space-y-3 sm:space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm sm:text-base">{item.name}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-sm sm:text-base">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Delivery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
              <div>
                <p className="text-gray-600">Name</p>
                <p className="font-medium">{order.details.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium">{order.details.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium break-words">{order.details.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Address</p>
                <p className="font-medium">{order.details.address}</p>
              </div>
              {order.details.specialInstructions && (
                <div className="col-span-2">
                  <p className="text-gray-600">Special Instructions</p>
                  <p className="font-medium">{order.details.specialInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 h-fit sticky top-20">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Order Summary</h2>
            
            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between font-bold border-t border-gray-200 pt-2 mt-2">
                <span>Total:</span>
                <span>${(order.total + 2.99).toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Payment Method:</span>
                <span>{order.details.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}</span>
              </div>
              <div className="mt-4">
                <p className="mb-1">Estimated Delivery</p>
                <p className="font-bold text-lg">
                  {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <Link
                href="/menu"
                className="block w-full bg-orange-500 text-white text-center py-2 sm:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm sm:text-base"
              >
                Order Something Else
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      }
    >
      <OrderContent />
    </Suspense>
  );
}

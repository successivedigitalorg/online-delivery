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
          total: 20.97,
          status: "confirmed",
          createdAt: new Date().toString(),
          details: {
            name: "John Doe",
            phone: "123-456-7890",
            email: "john@example.com",
            address: "123 Main St, City, Country",
            paymentMethod: "COD"
          }
        });
        setLoading(false);
      }, 1000);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Tracking Order</h1>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-6">We could not find the order you are looking for.</p>
        <Link
          href="/menu"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  const steps = [
    { 
      id: "confirmed", 
      name: "Order Confirmed", 
      description: "Your order has been received and confirmed", 
      icon: FaCheckCircle,
      complete: ["confirmed", "preparing", "out_for_delivery", "delivered"].includes(order.status)
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
        <p className="text-gray-600">
          Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
        </p>
      </div>

      {/* Order Status */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Order Status</h2>
        <div className="relative">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <p className="font-medium">{order.details.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Address</p>
                <p className="font-medium">{order.details.address}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment Method</p>
                <p className="font-medium">{order.details.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(order.total - 2.99).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="border-t my-4 pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/menu"
              className="w-full bg-orange-500 text-white text-center py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors block mt-6"
            >
              Order Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderTracking() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Tracking Order</h1>
        <p>Loading order details...</p>
      </div>
    }>
      <OrderContent />
    </Suspense>
  );
}

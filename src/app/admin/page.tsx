"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/lib/store/admin";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { 
  FaClipboardList, 
  FaDollarSign, 
  FaUsers, 
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaUtensils,
  FaChartBar
} from "react-icons/fa";
import { Order, Analytics } from "@/lib/types";

// Mock data for demo purposes
const mockRecentOrders: Order[] = [
  {
    id: "ORD-1001",
    items: [
      { id: 1, name: "Margherita Pizza", description: "", price: 12.99, image: "", category: "pizza", quantity: 2 },
      { id: 6, name: "French Fries", description: "", price: 4.99, image: "", category: "sides", quantity: 1 }
    ],
    total: 32.97,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    details: {
      name: "John Doe",
      phone: "123-456-7890",
      email: "john@example.com",
      address: "123 Main St",
      paymentMethod: "COD"
    }
  },
  {
    id: "ORD-1002", 
    items: [
      { id: 2, name: "Pepperoni Pizza", description: "", price: 14.99, image: "", category: "pizza", quantity: 1 }
    ],
    total: 17.98,
    status: "preparing",
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    details: {
      name: "Jane Smith",
      phone: "098-765-4321", 
      email: "jane@example.com",
      address: "456 Oak Ave",
      paymentMethod: "COD"
    }
  },
  {
    id: "ORD-1003",
    items: [
      { id: 5, name: "BBQ Chicken Pizza", description: "", price: 17.99, image: "", category: "pizza", quantity: 1 },
      { id: 8, name: "Garlic Bread", description: "", price: 3.99, image: "", category: "sides", quantity: 2 }
    ],
    total: 27.97,
    status: "out_for_delivery",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    details: {
      name: "Mike Johnson",
      phone: "555-123-4567",
      email: "mike@example.com", 
      address: "789 Pine St",
      paymentMethod: "COD"
    }
  }
];

const mockAnalytics: Analytics = {
  totalOrders: 156,
  totalRevenue: 2847.65,
  averageOrderValue: 18.25,
  topProducts: [
    { productId: 1, productName: "Margherita Pizza", orderCount: 45 },
    { productId: 2, productName: "Pepperoni Pizza", orderCount: 38 },
    { productId: 5, productName: "BBQ Chicken Pizza", orderCount: 29 }
  ],
  busyHours: [
    { hour: 12, orderCount: 15 },
    { hour: 18, orderCount: 32 },
    { hour: 19, orderCount: 28 },
    { hour: 20, orderCount: 22 }
  ],
  dailySales: [
    { date: "2025-01-01", sales: 485.30, orders: 28 },
    { date: "2025-01-02", sales: 392.15, orders: 22 },
    { date: "2025-01-03", sales: 567.80, orders: 31 }
  ]
};

export default function AdminDashboard() {
  const { user, checkAuth } = useAdminStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    if (!checkAuth()) return;
    
    // Load mock data
    setOrders(mockRecentOrders);
    setAnalytics(mockAnalytics);
  }, [checkAuth]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'out_for_delivery': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'confirmed': return FaCheckCircle;
      case 'preparing': return FaUtensils;
      case 'out_for_delivery': return FaTruck;
      case 'delivered': return FaCheckCircle;
      default: return FaClock;
    }
  };

  if (!checkAuth()) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNavigation />
      
      {/* Main content */}
      <div className="flex-1 lg:pl-64">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>

          {/* Stats Grid */}
          {analytics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaClipboardList className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaDollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${analytics.totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FaShoppingCart className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">${analytics.averageOrderValue.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaUsers className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Orders</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.filter(o => o.status !== 'delivered').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {orders.map((order) => {
                    const StatusIcon = getStatusIcon(order.status);
                    return (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <StatusIcon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">#{order.id}</p>
                            <p className="text-sm text-gray-600">{order.details.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="/admin/orders"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaClipboardList className="h-6 w-6 text-blue-600 mr-3" />
                    <span className="font-medium">Manage Orders</span>
                  </a>
                  <a 
                    href="/admin/menu"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaUtensils className="h-6 w-6 text-green-600 mr-3" />
                    <span className="font-medium">Edit Menu</span>
                  </a>
                  <a 
                    href="/admin/customers"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaUsers className="h-6 w-6 text-purple-600 mr-3" />
                    <span className="font-medium">View Customers</span>
                  </a>
                  <a 
                    href="/admin/analytics"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaChartBar className="h-6 w-6 text-orange-600 mr-3" />
                    <span className="font-medium">View Analytics</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useAdminStore } from "@/lib/store/admin";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { Analytics } from "@/lib/types";
import { 
  FaDollarSign, 
  FaShoppingCart, 
  FaTruck, 
  FaUsers,
  FaClock,
  FaChartBar,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";

// Mock analytics data
const mockAnalytics: Analytics = {
  totalOrders: 1247,
  totalRevenue: 18645.30,
  averageOrderValue: 14.96,
  topProducts: [
    { productId: 1, productName: "Margherita Pizza", orderCount: 156 },
    { productId: 2, productName: "Pepperoni Pizza", orderCount: 134 },
    { productId: 5, productName: "BBQ Chicken Pizza", orderCount: 98 },
    { productId: 8, productName: "Garlic Bread", orderCount: 87 },
    { productId: 6, productName: "French Fries", orderCount: 76 }
  ],
  busyHours: [
    { hour: 11, orderCount: 12 },
    { hour: 12, orderCount: 45 },
    { hour: 13, orderCount: 52 },
    { hour: 17, orderCount: 38 },
    { hour: 18, orderCount: 89 },
    { hour: 19, orderCount: 94 },
    { hour: 20, orderCount: 76 },
    { hour: 21, orderCount: 58 },
    { hour: 22, orderCount: 23 }
  ],
  dailySales: [
    { date: "2025-01-01", sales: 892.45, orders: 67 },
    { date: "2025-01-02", sales: 745.30, orders: 52 },
    { date: "2025-01-03", sales: 1034.80, orders: 78 },
    { date: "2025-01-04", sales: 923.15, orders: 61 },
    { date: "2025-01-05", sales: 1156.70, orders: 83 },
    { date: "2025-01-06", sales: 1298.25, orders: 95 },
    { date: "2025-01-07", sales: 1387.60, orders: 102 }
  ]
};

export default function AnalyticsDashboard() {
  const { checkAuth } = useAdminStore();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [timeRange, setTimeRange] = useState<string>('7d');

  useEffect(() => {
    if (!checkAuth()) return;
    setAnalytics(mockAnalytics);
  }, [checkAuth]);

  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return "12 PM";
    return `${hour - 12} PM`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (!checkAuth()) {
    return <div>Redirecting to login...</div>;
  }

  if (!analytics) {
    return <div>Loading analytics...</div>;
  }

  // Calculate growth percentages (mock data)
  const growthData = {
    revenue: 12.5,
    orders: 8.3,
    avgOrder: -2.1,
    customers: 15.7
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNavigation />
      
      {/* Main content */}
      <div className="flex-1 lg:pl-64">
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600">Business insights and performance metrics</p>
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${analytics.totalRevenue.toFixed(2)}</p>
                  <div className="flex items-center mt-1">
                    {growthData.revenue > 0 ? (
                      <FaArrowUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <FaArrowDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-sm ml-1 ${growthData.revenue > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.abs(growthData.revenue)}%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaDollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders}</p>
                  <div className="flex items-center mt-1">
                    {growthData.orders > 0 ? (
                      <FaArrowUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <FaArrowDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-sm ml-1 ${growthData.orders > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.abs(growthData.orders)}%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">${analytics.averageOrderValue.toFixed(2)}</p>
                  <div className="flex items-center mt-1">
                    {growthData.avgOrder > 0 ? (
                      <FaArrowUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <FaArrowDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-sm ml-1 ${growthData.avgOrder > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.abs(growthData.avgOrder)}%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FaChartBar className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Customer Growth</p>
                  <p className="text-2xl font-bold text-gray-900">+{growthData.customers}%</p>
                  <div className="flex items-center mt-1">
                    <FaArrowUp className="h-3 w-3 text-green-500" />
                    <span className="text-sm ml-1 text-green-600">vs last period</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaUsers className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Products */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
              <div className="space-y-4">
                {analytics.topProducts.map((product, index) => (
                  <div key={product.productId} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white mr-3 ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-orange-400' : 'bg-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">{product.productName}</span>
                    </div>
                    <span className="text-sm text-gray-600">{product.orderCount} orders</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Busy Hours */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Busy Hours</h3>
              <div className="space-y-3">
                {analytics.busyHours
                  .sort((a, b) => b.orderCount - a.orderCount)
                  .slice(0, 6)
                  .map((hour) => (
                    <div key={hour.hour} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaClock className="h-4 w-4 text-gray-400 mr-3" />
                        <span className="font-medium text-gray-900">{formatHour(hour.hour)}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${(hour.orderCount / Math.max(...analytics.busyHours.map(h => h.orderCount))) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">{hour.orderCount}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Daily Sales Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Sales</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600 border-b pb-2">
                <span>Date</span>
                <span>Sales</span>
                <span>Orders</span>
              </div>
              {analytics.dailySales.map((day) => (
                <div key={day.date} className="flex items-center justify-between py-2">
                  <span className="font-medium text-gray-900">{formatDate(day.date)}</span>
                  <span className="text-green-600 font-medium">${day.sales.toFixed(2)}</span>
                  <span className="text-gray-600">{day.orders} orders</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
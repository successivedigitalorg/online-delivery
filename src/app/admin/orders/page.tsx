"use client";

import { useState, useEffect } from "react";
import { useAdminStore } from "@/lib/store/admin";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { Order } from "@/lib/types";
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaEdit,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaUtensils,
  FaCheck
} from "react-icons/fa";
import { toast } from "react-hot-toast";

// Extended mock data with more orders
const mockOrders: Order[] = [
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
      address: "123 Main St, City, ST 12345",
      paymentMethod: "COD"
    },
    estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString()
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
      address: "456 Oak Ave, City, ST 12345",
      paymentMethod: "COD"
    },
    estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString()
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
      address: "789 Pine St, City, ST 12345",
      paymentMethod: "COD"
    },
    assignedTo: "DEL-001",
    estimatedDelivery: new Date(Date.now() + 15 * 60 * 1000).toISOString()
  },
  {
    id: "ORD-1004",
    items: [
      { id: 4, name: "Veggie Supreme Pizza", description: "", price: 16.99, image: "", category: "pizza", quantity: 1 }
    ],
    total: 19.98,
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    details: {
      name: "Sarah Williams",
      phone: "444-555-6666",
      email: "sarah@example.com",
      address: "321 Elm St, City, ST 12345",
      paymentMethod: "COD"
    }
  },
  {
    id: "ORD-1005",
    items: [
      { id: 1, name: "Margherita Pizza", description: "", price: 12.99, image: "", category: "pizza", quantity: 1 },
      { id: 10, name: "Coca Cola", description: "", price: 2.49, image: "", category: "drinks", quantity: 2 }
    ],
    total: 20.97,
    status: "delivered",
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    details: {
      name: "Robert Brown",
      phone: "777-888-9999",
      email: "robert@example.com",
      address: "654 Cedar Rd, City, ST 12345",
      paymentMethod: "COD"
    },
    assignedTo: "DEL-002"
  }
];

export default function OrdersManagement() {
  const { checkAuth } = useAdminStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    if (!checkAuth()) return;
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, [checkAuth]);

  useEffect(() => {
    let filtered = orders;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.details.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.details.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} status updated to ${newStatus.replace('_', ' ')}`);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'out_for_delivery': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return FaClock;
      case 'confirmed': return FaCheckCircle;
      case 'preparing': return FaUtensils;
      case 'out_for_delivery': return FaTruck;
      case 'delivered': return FaCheck;
      default: return FaClock;
    }
  };

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    switch (currentStatus) {
      case 'pending': return 'confirmed';
      case 'confirmed': return 'preparing';
      case 'preparing': return 'out_for_delivery';
      case 'out_for_delivery': return 'delivered';
      default: return null;
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
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600">Manage and track all customer orders</p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders by ID, customer name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Order['status'] | 'all')}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Orders ({filteredOrders.length})
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => {
                    const StatusIcon = getStatusIcon(order.status);
                    const nextStatus = getNextStatus(order.status);
                    
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.details.name}</div>
                            <div className="text-sm text-gray-500">{order.details.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {order.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowOrderModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <FaEye />
                            </button>
                            {nextStatus && (
                              <button
                                onClick={() => updateOrderStatus(order.id, nextStatus)}
                                className="text-green-600 hover:text-green-900"
                                title={`Mark as ${nextStatus.replace('_', ' ')}`}
                              >
                                <FaEdit />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Order Details - #{selectedOrder.id}</h3>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p><strong>Name:</strong> {selectedOrder.details.name}</p>
                    <p><strong>Phone:</strong> {selectedOrder.details.phone}</p>
                    <p><strong>Email:</strong> {selectedOrder.details.email}</p>
                    <p><strong>Address:</strong> {selectedOrder.details.address}</p>
                    <p><strong>Payment:</strong> {selectedOrder.details.paymentMethod}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                        <span>{item.quantity}x {item.name}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 font-medium">
                      <span>Total</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Order Status</h4>
                  <div className="flex gap-2">
                    {['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(selectedOrder.id, status as Order['status'])}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedOrder.status === status
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
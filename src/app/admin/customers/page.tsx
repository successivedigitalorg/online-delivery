"use client";

import { useState, useEffect } from "react";
import { useAdminStore } from "@/lib/store/admin";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { Customer } from "@/lib/types";
import { 
  FaSearch, 
  FaEye, 
  FaEnvelope, 
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShoppingCart
} from "react-icons/fa";

// Mock customer data
const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, ST 12345",
    totalOrders: 12,
    totalSpent: 287.45,
    joinedAt: "2024-11-15T10:30:00Z"
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "098-765-4321",
    address: "456 Oak Ave, City, ST 12345",
    totalOrders: 8,
    totalSpent: 134.80,
    joinedAt: "2024-12-01T14:22:00Z"
  },
  {
    id: "CUST-003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "555-123-4567",
    address: "789 Pine St, City, ST 12345",
    totalOrders: 15,
    totalSpent: 428.90,
    joinedAt: "2024-10-08T09:15:00Z"
  },
  {
    id: "CUST-004",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "444-555-6666",
    address: "321 Elm St, City, ST 12345",
    totalOrders: 5,
    totalSpent: 89.95,
    joinedAt: "2024-12-20T16:45:00Z"
  },
  {
    id: "CUST-005",
    name: "Robert Brown",
    email: "robert@example.com",
    phone: "777-888-9999",
    address: "654 Cedar Rd, City, ST 12345",
    totalOrders: 23,
    totalSpent: 675.20,
    joinedAt: "2024-09-12T11:30:00Z"
  }
];

export default function CustomerManagement() {
  const { checkAuth } = useAdminStore();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [sortBy, setSortBy] = useState<string>('joinedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (!checkAuth()) return;
    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  }, [checkAuth]);

  useEffect(() => {
    let filtered = customers;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
    }
    
    // Sort customers
    filtered = [...filtered].sort((a, b) => {
      let aValue = a[sortBy as keyof Customer];
      let bValue = b[sortBy as keyof Customer];
      
      if (sortBy === 'joinedAt') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
    
    setFilteredCustomers(filtered);
  }, [customers, searchTerm, sortBy, sortOrder]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 500) return { name: 'VIP', color: 'bg-purple-100 text-purple-800' };
    if (totalSpent >= 200) return { name: 'Gold', color: 'bg-yellow-100 text-yellow-800' };
    if (totalSpent >= 100) return { name: 'Silver', color: 'bg-gray-100 text-gray-800' };
    return { name: 'Bronze', color: 'bg-orange-100 text-orange-800' };
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
            <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
            <p className="text-gray-600">View and manage customer information</p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search customers by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="joinedAt">Join Date</option>
                  <option value="name">Name</option>
                  <option value="totalSpent">Total Spent</option>
                  <option value="totalOrders">Total Orders</option>
                </select>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customer Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaCalendarAlt className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">New This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {customers.filter(c => new Date(c.joinedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaShoppingCart className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(customers.reduce((sum, c) => sum + c.totalOrders, 0) / customers.length || 0).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FaShoppingCart className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Spent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length || 0).toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Customers ({filteredCustomers.length})
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => {
                    const tier = getCustomerTier(customer.totalSpent);
                    
                    return (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500">ID: {customer.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{customer.email}</div>
                          <div className="text-sm text-gray-500">{customer.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {customer.totalOrders}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${customer.totalSpent.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${tier.color}`}>
                            {tier.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(customer.joinedAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              setSelectedCustomer(customer);
                              setShowCustomerModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEye />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No customers found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Details Modal */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Customer Details</h3>
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Personal Information</h4>
                  <div className="bg-gray-50 p-4 rounded-md space-y-3">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-900 w-24">Name:</div>
                      <div>{selectedCustomer.name}</div>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="h-4 w-4 text-gray-400 mr-2" />
                      <div className="font-medium text-gray-900 w-20">Email:</div>
                      <div>{selectedCustomer.email}</div>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="h-4 w-4 text-gray-400 mr-2" />
                      <div className="font-medium text-gray-900 w-20">Phone:</div>
                      <div>{selectedCustomer.phone}</div>
                    </div>
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                      <div className="font-medium text-gray-900 w-20">Address:</div>
                      <div>{selectedCustomer.address}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Order Statistics</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Total Orders</div>
                        <div className="text-xl font-bold text-gray-900">{selectedCustomer.totalOrders}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Total Spent</div>
                        <div className="text-xl font-bold text-gray-900">${selectedCustomer.totalSpent.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Average Order</div>
                        <div className="text-xl font-bold text-gray-900">
                          ${(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Customer Tier</div>
                        <div className="text-xl font-bold text-gray-900">
                          {getCustomerTier(selectedCustomer.totalSpent).name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Account Information</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center">
                      <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                      <div className="font-medium text-gray-900 w-24">Joined:</div>
                      <div>{formatDate(selectedCustomer.joinedAt)}</div>
                    </div>
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
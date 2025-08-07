"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminStore } from "@/lib/store/admin";
import { 
  FaHome, 
  FaClipboardList, 
  FaUtensils, 
  FaUsers, 
  FaTruck, 
  FaChartBar, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: FaHome },
  { name: "Orders", href: "/admin/orders", icon: FaClipboardList },
  { name: "Menu", href: "/admin/menu", icon: FaUtensils },
  { name: "Customers", href: "/admin/customers", icon: FaUsers },
  { name: "Delivery", href: "/admin/delivery", icon: FaTruck },
  { name: "Analytics", href: "/admin/analytics", icon: FaChartBar },
];

export default function AdminNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAdminStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-gray-900">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-white text-xl font-bold">Admin Portal</h1>
          </div>
          
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex-shrink-0 px-4 py-4 border-t border-gray-700">
            <div className="flex items-center mb-3">
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="group flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >
              <FaSignOutAlt className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile menu button */}
        <div className="bg-gray-900 px-4 py-4 flex items-center justify-between">
          <h1 className="text-white text-lg font-bold">Admin Portal</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900">
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive
                            ? "bg-gray-800 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <item.icon className="mr-4 h-6 w-6" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              
              <div className="flex-shrink-0 px-4 py-4 border-t border-gray-700">
                <div className="flex items-center mb-3">
                  <div>
                    <p className="text-base font-medium text-white">{user?.name}</p>
                    <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="group flex items-center w-full px-2 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  <FaSignOutAlt className="mr-4 h-6 w-6" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
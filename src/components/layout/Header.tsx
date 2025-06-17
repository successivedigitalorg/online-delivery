"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShoppingCart, FaPizzaSlice, FaBars, FaTimes } from "react-icons/fa";
import { useCartStore } from "@/lib/store/cart";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const cartItems = useCartStore((state) => state.getTotalItems());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Handle hydration mismatch
  useEffect(() => {
    setCartItemsCount(cartItems);
  }, [cartItems]);
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Orders", href: "/order" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-orange-500">
          <FaPizzaSlice className="text-orange-500" />
          <span className="hidden sm:inline">PizzaDelight</span>
          <span className="sm:hidden">Pizza</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 hover:text-orange-500 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              href={link.href} 
              key={link.name}
              className={`text-base font-medium hover:text-orange-500 transition-colors ${
                pathname === link.href ? "text-orange-500" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link 
            href="/cart" 
            className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors"
          >
            <FaShoppingCart className="text-xl" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link 
                href={link.href} 
                key={link.name}
                className={`px-4 py-3 text-base font-medium hover:bg-gray-100 ${
                  pathname === link.href ? "text-orange-500" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
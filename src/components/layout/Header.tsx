"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShoppingCart, FaPizzaSlice } from "react-icons/fa";
import { useCartStore } from "@/lib/store/cart";

export default function Header() {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.getTotalItems());
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Orders", href: "/order" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-orange-500">
          <FaPizzaSlice className="text-orange-500" />
          <span>PizzaDelight</span>
        </Link>

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
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
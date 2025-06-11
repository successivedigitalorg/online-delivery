import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaPizzaSlice } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="mb-6 md:mb-0 max-w-full md:max-w-md">
            <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-white mb-4">
              <FaPizzaSlice className="text-orange-500" />
              <span>PizzaDelight</span>
            </Link>
            <p className="text-gray-300 text-sm sm:text-base">
              Serving delicious pizzas and sides with quick delivery to your doorstep.
              We take pride in our fresh ingredients and excellent service.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full md:w-auto">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><Link href="/" className="text-gray-300 hover:text-orange-500 transition-colors">Home</Link></li>
                <li><Link href="/menu" className="text-gray-300 hover:text-orange-500 transition-colors">Menu</Link></li>
                <li><Link href="/cart" className="text-gray-300 hover:text-orange-500 transition-colors">Cart</Link></li>
                <li><Link href="/order" className="text-gray-300 hover:text-orange-500 transition-colors">Track Order</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li>123 Main Street</li>
                <li>Your City, ST 12345</li>
                <li>Phone: (123) 456-7890</li>
                <li className="break-words">Email: info@pizzadelight.com</li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-gray-300 hover:text-orange-500 transition-colors" aria-label="Facebook">
                  <FaFacebook size={24} />
                </a>
                <a href="https://instagram.com" className="text-gray-300 hover:text-orange-500 transition-colors" aria-label="Instagram">
                  <FaInstagram size={24} />
                </a>
                <a href="https://twitter.com" className="text-gray-300 hover:text-orange-500 transition-colors" aria-label="Twitter">
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center sm:text-left text-sm">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} PizzaDelight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
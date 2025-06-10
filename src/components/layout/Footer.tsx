import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaPizzaSlice } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-white mb-4">
              <FaPizzaSlice className="text-orange-500" />
              <span>PizzaDelight</span>
            </Link>
            <p className="max-w-md text-gray-300">
              Serving delicious pizzas and sides with quick delivery to your doorstep.
              We take pride in our fresh ingredients and excellent service.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-orange-500 transition-colors">Home</Link></li>
                <li><Link href="/menu" className="text-gray-300 hover:text-orange-500 transition-colors">Menu</Link></li>
                <li><Link href="/cart" className="text-gray-300 hover:text-orange-500 transition-colors">Cart</Link></li>
                <li><Link href="/order" className="text-gray-300 hover:text-orange-500 transition-colors">Track Order</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>123 Main Street</li>
                <li>Your City, ST 12345</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: info@pizzadelight.com</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Monday - Thursday: 11am - 10pm</li>
                <li>Friday - Saturday: 11am - 11pm</li>
                <li>Sunday: 12pm - 9pm</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PizzaDelight. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
              <FaFacebook size={20} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
              <FaInstagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
              <FaTwitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
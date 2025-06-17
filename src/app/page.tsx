import Link from "next/link";
import { getPopularProducts, categories } from "@/lib/data";
import CategoryCard from "@/components/ui/CategoryCard";
import ProductCard from "@/components/ui/ProductCard";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { FaTruck, FaClock, FaLeaf } from "react-icons/fa";

export default function Home() {
  const popularProducts = getPopularProducts();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50 z-10"></div>
        <div className="relative h-full w-full">
          <div className="w-full h-full">
            <ResponsiveImage
              src="/pizzas/margherita.svg"
              alt="Fresh and delicious pizza"
              fill
              priority
            />
          </div>
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
          <div className="container px-4 mx-auto">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-2 sm:mb-4">
              Delicious Pizza Delivered To Your Door
            </h1>
            <p className="text-base sm:text-xl text-white mb-4 sm:mb-8 max-w-2xl mx-auto">
              Fresh ingredients, amazing taste, fast delivery. Order now!
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
              <Link
                href="/menu"
                className="bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm sm:text-base"
              >
                Order Now
              </Link>
              <Link
                href="/menu"
                className="bg-white text-orange-500 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md text-center">
              <FaTruck className="mx-auto text-3xl sm:text-4xl text-orange-500 mb-2 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm sm:text-base">Hot and fresh food delivered to your doorstep in under 30 minutes.</p>
            </div>
            <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md text-center">
              <FaLeaf className="mx-auto text-3xl sm:text-4xl text-orange-500 mb-2 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600 text-sm sm:text-base">We use only the freshest ingredients for the best taste experience.</p>
            </div>
            <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md text-center sm:col-span-2 md:col-span-1">
              <FaClock className="mx-auto text-3xl sm:text-4xl text-orange-500 mb-2 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Easy Ordering</h3>
              <p className="text-gray-600 text-sm sm:text-base">Simple online ordering with Cash on Delivery payment option.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Browse Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                id={category.id} 
                name={category.name} 
                image={category.image} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Popular Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link
              href="/menu"
              className="inline-block bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm sm:text-base"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Ready to Order?</h2>
          <p className="text-base sm:text-xl mb-4 sm:mb-6 max-w-2xl mx-auto">
            Experience the best pizza delivery service with delicious options.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-white text-orange-500 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
}

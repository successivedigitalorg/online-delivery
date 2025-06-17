"use client";

import { useState } from "react";
import { products, categories } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory) 
    : products;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Our Menu</h1>
      
      {/* Category Filters */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex flex-nowrap gap-2 min-w-max">
          <button
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === null
                ? "bg-orange-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 py-8">No items found in this category.</p>
      )}
    </div>
  );
}
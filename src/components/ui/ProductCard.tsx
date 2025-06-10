"use client";

import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";
import ResponsiveImage from "./ResponsiveImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <div className="w-full h-full">
          <ResponsiveImage
            src={product.image}
            alt={product.name}
            fill
            className="transition-transform"
          />
        </div>
        {product.vegetarian && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Veg
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

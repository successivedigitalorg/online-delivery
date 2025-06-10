"use client";

import Link from "next/link";
import ResponsiveImage from "./ResponsiveImage";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
}

export default function CategoryCard({ id, name, image }: CategoryCardProps) {
  return (
    <Link 
      href={`/menu?category=${id}`} 
      className="relative rounded-lg overflow-hidden h-40 group shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="w-full h-full">
        <ResponsiveImage
          src={image}
          alt={name}
          fill
          className="group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
        <h3 className="text-white font-bold text-xl p-4">{name}</h3>
      </div>
    </Link>
  );
}
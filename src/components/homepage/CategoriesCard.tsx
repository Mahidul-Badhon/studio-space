"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  count: string;
  image: string;
  icon: React.ReactNode;
}

interface CategoriesCardProps {
  category: CategoryItem;
}

const CategoriesCard = ({ category }: CategoriesCardProps) => {
  return (
    <Link
      href={`/studios?category=${encodeURIComponent(category.name)}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white min-h-[260px] p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:border-zinc-700/80 hover:-translate-y-1 cursor-pointer"
    >
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={category.image}
          alt={category.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      </div>

      {/* Top Header: Category Icon & Direct Link Icon */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center justify-center size-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
          {category.icon}
        </div>

        <span className="flex items-center justify-center size-8 rounded-full bg-white/10 backdrop-blur-md text-white/80 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      {/* Bottom Content: Title, Description & Studio Count */}
      <div className="relative z-10 space-y-1.5 mt-auto pt-8">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
            {category.name}
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-xs text-zinc-200 font-medium">
            {category.count}
          </span>
        </div>
        <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>
    </Link>
  );
};

export default CategoriesCard;
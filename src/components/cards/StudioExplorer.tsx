"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MapPin, Star, ArrowRight, ArrowUpDown, Sparkles } from "lucide-react";

export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit?: number;
  maxCapacity?: number;
  location: string;
  imageUrl: string;
  amenities?: string[];
  overview?: string;
  rating?: number;
}

const CATEGORIES = [
  "All",
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Art Workshop",
];

function StudiosExplorerContent({ initialStudios }: { initialStudios: Studio[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  // Format initial studio ratings deterministically if not present in DB
  const studiosWithRatings = useMemo(() => {
    return initialStudios.map((studio, idx) => ({
      ...studio,
      rating: studio.rating || Number((4.6 + ((idx * 7) % 5) * 0.1).toFixed(1)),
    }));
  }, [initialStudios]);

  // If a valid category is passed in URL query (e.g. from homepage category cards), default to it
  const initialSelectedCategory =
    categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : "All";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialSelectedCategory);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Filter and sort studios
  const filteredStudios = useMemo(() => {
    let result = [...studiosWithRatings];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (studio) => studio.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort order
    if (sortBy === "price-low") {
      result.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sortBy === "rating-high") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [studiosWithRatings, selectedCategory, sortBy]);

  return (
    <div className="space-y-8">
      {/* Category Pills Strip & Sort Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <ArrowUpDown className="w-4 h-4 text-zinc-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating-high">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Studios Grid */}
      {filteredStudios.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
          <Sparkles className="w-10 h-10 mx-auto text-zinc-400 mb-3" />
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
            No studio spaces found
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Try switching categories or view all workspaces.
          </p>
          <button
            onClick={() => setSelectedCategory("All")}
            className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredStudios.map((studio) => (
            <div
              key={studio._id}
              className="group flex flex-col rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Studio Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={studio.imageUrl}
                  alt={studio.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {studio.category}
                </span>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-black/60 backdrop-blur-md text-amber-400 border border-white/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{studio.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {studio.title}
                  </h3>

                  <p className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    {studio.location}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-zinc-900 dark:text-white">
                      ${studio.hourlyRate}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                      / hr
                    </span>
                  </div>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-indigo-600 text-zinc-800 hover:text-white dark:bg-zinc-800 dark:hover:bg-indigo-600 dark:text-zinc-200 dark:hover:text-white text-xs font-semibold transition-all group/btn"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StudiosExplorer({ initialStudios }: { initialStudios: Studio[] }) {
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-zinc-500">Loading studios...</div>}>
      <StudiosExplorerContent initialStudios={initialStudios} />
    </Suspense>
  );
}
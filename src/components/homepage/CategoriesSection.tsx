import React from "react";
import CategoriesCard, { CategoryItem } from "./CategoriesCard";
import { Camera, Clapperboard, Mic2, Music, Palette } from "lucide-react";

const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: "1",
    name: "Photo Studio",
    description: "High-ceiling daylight lofts, cyclorama infinity walls, and strobe packages.",
    count: "24+ spaces",
    image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=800&auto=format&fit=crop",
    icon: <Camera className="size-5 text-indigo-400" />,
  },
  {
    id: "2",
    name: "Film Stage",
    description: "Soundproof production stages, green screens, and heavy-duty grid rigs.",
    count: "18+ spaces",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
    icon: <Clapperboard className="size-5 text-amber-400" />,
  },
  {
    id: "3",
    name: "Podcast Lounge",
    description: "Multi-camera video setups, Shure microphones, and acoustic treatments.",
    count: "15+ spaces",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    icon: <Mic2 className="size-5 text-rose-400" />,
  },
  {
    id: "4",
    name: "Music Suite",
    description: "Vocal isolation booths, analog mixers, monitors, and MIDI controllers.",
    count: "12+ spaces",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
    icon: <Music className="size-5 text-emerald-400" />,
  },
  {
    id: "5",
    name: "Art Workshop",
    description: "Open floor plans with natural sunlight for painting, ceramics, and builds.",
    count: "10+ spaces",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    icon: <Palette className="size-5 text-purple-400" />,
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            Browse by Discipline
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1">
            Find the Perfect Space for Your Craft
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
          Explore curated creative environments equipped with top-tier gear, lighting, and acoustics.
        </p>
      </div>

      {/* Responsive Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES_DATA.map((category) => (
          <CategoriesCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
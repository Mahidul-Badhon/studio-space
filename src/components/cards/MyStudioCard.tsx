"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Users, 
  Trash2, 
  ArrowUpRight 
} from "lucide-react";
import { toast } from "../ui/toast";
import { Studio } from "@/types/studio";
import EditStudioDialog from "../EditStudioDialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface MyStudioCardProps {
  studio: Studio;
}

const MyStudioCard = ({ studio }: MyStudioCardProps) => {
  const router = useRouter();

  // Handle Studio Deletion
  const handleDeleteStudio = async () => {

    const token = await getTokenFromClient()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mystudios/${studio._id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Failed to delete studio");

      toast.add({ type: "success", description: "Studio removed successfully!" });
      
      // Refresh list after deletion
      router.refresh();
    } catch (error) {
      toast.add({ type: "error", description: "Could not delete studio." });
    }
  };

  // Handle Edit Action
  

  const thumbnail =
    studio.images && studio.images.length > 0
      ? studio.images[0]
      : studio.imageUrl;

  return (
    <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        
        {/* Left Side: Thumbnail + Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4.5 w-full md:w-auto">
          {/* Studio Image Thumbnail */}
          <div className="relative w-full sm:w-32 h-44 sm:h-28 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shrink-0">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={studio.title}
                fill
                sizes="(max-width: 640px) 100vw, 128px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                <Building2 className="w-8 h-8" />
              </div>
            )}

            {/* Category Tag on Thumbnail */}
            <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold rounded-md bg-black/60 backdrop-blur-md text-white border border-white/20">
              {studio.category || "Studio"}
            </span>
          </div>

          {/* Studio Specifications */}
          <div className="space-y-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white line-clamp-1">
                {studio.title}
              </h3>
              <p className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="truncate max-w-xs">{studio.location}</span>
              </p>
            </div>

            {/* Key Data Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                ${studio.hourlyRate}/hr
              </span>

              {studio.maxCapacity && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                  <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  Max {studio.maxCapacity} Guests
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-800/80 shrink-0 justify-end">
          
          {/* View Details Link Button */}
          <Link
            href={`/studios/${studio._id}`}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Edit Studio Button */}
          <EditStudioDialog studio={studio}></EditStudioDialog>

          {/* Delete Studio Button */}
          <button
            type="button"
            onClick={handleDeleteStudio}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            title="Delete Studio"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyStudioCard;
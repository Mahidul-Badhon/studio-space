import React from "react";
import Link from "next/link";
import { Home, Compass, ArrowLeft, VideoOff } from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-[85vh] w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-xl w-full text-center space-y-8">
        
        {/* Visual Cue / Icon Accent */}
        <div className="relative mx-auto flex items-center justify-center size-24 sm:size-28 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 shadow-lg shadow-indigo-500/10">
          <VideoOff className="size-12 sm:size-14 text-indigo-600 dark:text-indigo-400" />
          <span className="absolute -top-1.5 -right-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-black shadow-xs">
            Offline
          </span>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            Error 404 • Studio Unoccupied
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Lost in the Production Lot
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            The studio stage or booking URL you were looking for doesn’t exist, has been moved, or is currently striking set.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Home className="size-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/studios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-sm font-semibold transition-all cursor-pointer"
          >
            <Compass className="size-4 text-indigo-500" />
            <span>Explore Studios</span>
          </Link>
        </div>

        {/* Helpful links footer pill */}
        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Need assistance finding a reserved space?{" "}
            <Link
              href="/#about-us"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium inline-flex items-center gap-1"
            >
              Contact Support
              <ArrowLeft className="size-3 rotate-180" />
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
};

export default NotFound;
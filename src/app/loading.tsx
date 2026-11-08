import { Loader2, Video } from "lucide-react";

const LoadingPage = () => {
  return (
    <main className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="relative flex flex-col items-center justify-center space-y-6 max-w-sm w-full text-center">
        
        {/* Animated Icon Container with Pulse Rings */}
        <div className="relative flex items-center justify-center size-20 sm:size-24">
          {/* Subtle Outer Ping / Pulse Ring */}
          <div className="absolute inset-0 rounded-3xl bg-indigo-500/20 dark:bg-indigo-500/10 animate-ping opacity-75" />
          
          {/* Main Icon Card */}
          <div className="relative flex items-center justify-center size-full rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 shadow-lg shadow-indigo-500/10">
            <Video className="size-9 sm:size-10 text-indigo-600 dark:text-indigo-400 animate-pulse" />
          </div>

          {/* Mini Rotating Spinner Indicator */}
          <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <Loader2 className="size-4 text-indigo-600 dark:text-indigo-400 animate-spin" />
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Setting the Stage
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
            Preparing your studio experience and loading available dates...
          </p>
        </div>

        {/* Skeleton Progress Bar */}
        <div className="w-48 h-1.5 bg-zinc-100 dark:bg-zinc-800/80 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-full w-2/5 animate-[shimmer_1.5s_infinite] -translate-x-full" 
               style={{
                 animation: "indeterminate 1.4s ease-in-out infinite",
               }}
          />
        </div>

      </div>

      {/* Embedded keyframe for seamless indeterminate animation without custom tailwind config */}
      <style>{`
        @keyframes indeterminate {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </main>
  );
};

export default LoadingPage;
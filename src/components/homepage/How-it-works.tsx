import React from "react";
import { Search, CalendarClock, Zap, Camera, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Step {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: Step[] = [
  {
    id: "discover",
    stepNumber: "01",
    title: "Discover Spaces",
    description:
      "Filter top-rated studios by location, gear equipment, lighting setups, and creative aesthetic.",
    icon: Search,
  },
  {
    id: "select",
    stepNumber: "02",
    title: "Select Shoot Hours",
    description:
      "Pick your preferred date and reserve the exact hourly window that matches your production schedule.",
    icon: CalendarClock,
  },
  {
    id: "book",
    stepNumber: "03",
    title: "Book Instantly",
    description:
      "Lock in your spot with transparent pricing, zero hidden charges, and instant host confirmation.",
    icon: Zap,
  },
  {
    id: "create",
    stepNumber: "04",
    title: "Create & Produce",
    description:
      "Arrive on set with access codes ready, plug into premium studio gear, and bring your vision to life.",
    icon: Camera,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="relative w-full py-24 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-200 overflow-hidden border-t border-zinc-200 dark:border-zinc-800/60">
      {/* Background Decorative Glow (Dark Mode only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 dark:bg-indigo-600/10 blur-[130px] rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-3">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase">
            Simple & Seamless Process
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            How Booking Works
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            From discovering the ideal backdrop to wrapping up your session, reserve your dream production space in four effortless steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Connecting line on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[4.5rem] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent z-0"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="group relative z-10 flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 shadow-sm dark:shadow-none hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
              >
                {/* Header row: Icon & Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-zinc-300 dark:text-zinc-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-white mb-2 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group"
          >
            Explore available studios now
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
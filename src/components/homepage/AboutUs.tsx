import React from 'react';
import Link from 'next/link';
import { Target, Users2, Sparkles, ArrowRight } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Verified Studios' },
  { value: '12k+', label: 'Booked Hours' },
  { value: '98%', label: 'Positive Feedback' },
  { value: '25+', label: 'Creative Hubs' },
];

const pillars = [
  {
    icon: Target,
    title: 'Democratizing Production',
    description:
      'We remove booking bureaucracy and steep agency retainers so indie creators can access world-class studio facilities on their own terms.',
  },
  {
    icon: Sparkles,
    title: 'Inspiring Spaces',
    description:
      'From daylight cycloramas to acoustically tuned podcast rooms, we curate studios built by storytellers, for storytellers.',
  },
  {
    icon: Users2,
    title: 'Creator-First Community',
    description:
      'We empower independent studio owners to monetize downtime while connecting directors, photographers, and artists across the globe.',
  },
];

const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="relative w-full py-24 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-200 overflow-hidden border-t border-zinc-200 dark:border-zinc-800/60">
      {/* Decorative Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-0 w-[450px] h-[300px] bg-indigo-500/5 dark:bg-indigo-600/10 blur-[140px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-10 w-[400px] h-[250px] bg-violet-500/5 dark:bg-violet-600/10 blur-[130px] rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Top Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase">
              Our Story & Purpose
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Built to Empower <br />
              the Next Wave of Creatives
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed pt-2">
              StudioSpace was founded with a straightforward conviction: brilliant ideas should never stay unmade due to lack of production access. We bridge the gap between studio owners with unused floor time and creators looking for premium visual spaces.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              Whether you are an independent photographer staging an editorial campaign, an agency shooting commercial spots, or a podcast crew running weekly episodes, we handle the logistics so you can focus entirely on the craft.
            </p>
            <div className="pt-2">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group"
              >
                Join our creative network
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Stats Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none flex flex-col justify-center text-center backdrop-blur-sm"
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none hover:border-indigo-500/40 dark:hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
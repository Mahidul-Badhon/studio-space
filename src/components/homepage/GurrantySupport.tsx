import React from 'react';
import { ShieldCheck, UserCheck, Wrench, Headphones, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface AssuranceItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

const assurances: AssuranceItem[] = [
  {
    id: 'liability',
    icon: ShieldCheck,
    title: '$1M Liability Coverage',
    subtitle: 'Property & Space Protection',
    description:
      'Every shoot is backed by comprehensive property damage protection and third-party liability coverage so hosts can share spaces worry-free.',
    badge: 'Automatic Protection',
  },
  {
    id: 'verified',
    icon: UserCheck,
    title: '100% Verified Profiles',
    subtitle: 'Identity & Reputation Checks',
    description:
      'Every creator and host completes mandatory government ID verification, phone authentication, and portfolio screening before booking.',
    badge: 'Trust & Safety',
  },
  {
    id: 'equipment',
    icon: Wrench,
    title: 'Equipment Safety Standard',
    subtitle: 'Pre-inspected Hardware',
    description:
      'High-value cinema rigs, studio strobes, and grip setups are documented and checklist-cleared upon check-in to ensure flawless operating condition.',
    badge: 'Gear Guarantee',
  },
  {
    id: 'support',
    icon: Headphones,
    title: '24/7 Priority Support',
    subtitle: 'Always-on Live Assistance',
    description:
      'Our dedicated production concierges are on standby around the clock to handle access codes, overtime extensions, and urgent inquiries.',
    badge: 'On-Call Concierge',
  },
];

const GurrantySupport: React.FC = () => {
  return (
    <section className="relative w-full py-24 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-200 overflow-hidden border-t border-zinc-200 dark:border-zinc-800/60">
      {/* Background Accent Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[300px] bg-indigo-500/5 dark:bg-indigo-600/10 blur-[140px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-10 w-[400px] h-[250px] bg-violet-500/5 dark:bg-violet-600/10 blur-[130px] rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Top Header Grid */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase">
              Trust, Security & Reliability
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Host Guarantee & <br />
              Creator Support
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed pt-1">
              Production happens fast. We provide peace of mind with enterprise-grade protection, guaranteed gear integrity, and an active team backing every frame you shoot.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/trust-and-safety"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700/80 rounded-xl transition-all"
            >
              Read Safety Policy
              <ArrowUpRight className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {assurances.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative p-8 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/50 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Pill & Icon */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-600/15 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-zinc-200/70 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700/60">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400/90 mb-3 uppercase tracking-wider">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative Bottom Bar Indicator */}
                <div className="mt-8 pt-4 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                  Active on all confirmed bookings
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent border border-indigo-200/80 dark:border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-zinc-900 dark:text-white text-base">
              Ready to list your studio space?
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Join thousands of studio owners monetizing their creative locations securely.
            </p>
          </div>
          <Link
            href="/host"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shrink-0 shadow-md shadow-indigo-600/20"
          >
            Become a Host
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GurrantySupport;
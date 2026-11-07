"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Logo from "@/assets/Logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // =========================================================================
    // 👉 WRITE YOUR NEWSLETTER SUBSCRIPTION LOGIC HERE (e.g. POST /api/newsletter)
    // =========================================================================
    console.log("Subscribing email:", email);
  };

  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        
        {/* Newsletter Subscription Banner */}
        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 lg:p-10 mb-14 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Stay in the Loop
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Discover new studio drops & production deals
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Join our creative community for weekly spotlighted production spaces, sound stages, and exclusive host discounts.
              </p>
            </div>

            {/* Newsletter Input Form */}
            <form onSubmit={handleNewsletterSubmit} className="w-full lg:max-w-md shrink-0">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-xs shadow-indigo-600/20 transition-all shrink-0 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-2">
                No spam. Unsubscribe at any time with one click.
              </p>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-zinc-100 dark:border-zinc-800/80">
          
          {/* Brand Info (2 Columns Wide on Desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src={Logo}
                alt="StudioSpace logo"
                width={36}
                height={36}
                className="size-8 md:size-9 object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                StudioSpace
              </span>
            </Link>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Discover and book premier creative studio environments for photography, film production, music, and podcasting.
            </p>

            <div className="space-y-2 pt-1 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-indigo-500 shrink-0" />
                <span>SoHo Creative District, New York, NY</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-indigo-500 shrink-0" />
                <span>support@studiospace.io</span>
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/studios" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  All Studios
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Photo+Studio" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Photo Studios
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Film+Stage" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Film Stages
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Podcast+Lounge" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Podcast Lounges
                </Link>
              </li>
            </ul>
          </div>

          {/* Host & Community */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Host
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/add-studio" className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                  <Sparkles className="size-3.5" />
                  List a Space
                </Link>
              </li>
              <li>
                <Link href="/myStudios" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Host Dashboard
                </Link>
              </li>
              <li>
                <Link href="/myBookings" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#about-us" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#liability" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Host Protection & Terms
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} StudioSpace Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-500 transition-colors"
              aria-label="Twitter"
            >
              <FaXTwitter className="size-4" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-500 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="size-4" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-500 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
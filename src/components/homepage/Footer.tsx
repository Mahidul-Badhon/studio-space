"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/assets/Logo.png";
import { Mail, MapPin, Sparkles } from "lucide-react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-zinc-100 dark:border-zinc-800/80">
          
          {/* Brand Info & Newsletter (2 Columns Wide on Desktop) */}
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

            <div className="space-y-2 pt-2 text-xs text-zinc-500 dark:text-zinc-400">
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
              <FaXTwitter />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-500 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-500 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import HeroBanner from "@/assets/Hero_banner.png"

export function Banner() {
  return (
    <section className="relative -mt-16 flex min-h-svh items-center overflow-hidden md:-mt-20">
      <Image
        src={HeroBanner}
        alt="Photography studio with lighting equipment and backdrop"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Darken the photo so the copy stays readable (strongest on the left). */}
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/55 to-black/15" />

      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.15em] text-white/80 uppercase md:text-sm">
            Creative Spaces • Real People • Endless Possibilities
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl">
            Find the Perfect Space
            <span className="block text-indigo-500">for Your Next Creation</span>
          </h1>

          <p className="mt-6 max-w-[30rem] text-base leading-relaxed text-white/75 md:text-lg">
            Discover and book stunning studios for photography, filmmaking,
            podcasting and more.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
            <a
              href="/studios"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-indigo-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-indigo-600"
            >
              Explore Studios
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#"
              className="inline-flex h-11 items-center rounded-lg border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Host Your Space
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

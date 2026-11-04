"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "cn"

import Logo from "@/assets/Logo.png"
import { ModeToggle } from "@/components/ModeToggle"

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Explore Studios", href: "#" },
  { label: "How It Works", href: "#" },
  { label: "About Us", href: "#" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 transition-colors duration-300 md:h-20",
        scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="flex h-full items-center justify-between px-6 md:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-2.5 md:gap-3">
          <Image
            src={Logo}
            alt="StudioSpace logo"
            width={40}
            height={40}
            className="size-9 md:size-10"
          />
          <span className="text-lg font-bold tracking-tight text-white md:text-xl">
            StudioSpace
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "relative text-sm font-medium text-white/80 transition-colors hover:text-white",
                link.active &&
                  "text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-indigo-500"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <ModeToggle />
          <a
            href="#"
            className="hidden h-9 items-center rounded-lg bg-white px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-white/90 sm:inline-flex md:px-5"
          >
            Login
          </a>
          <a
            href="#"
            className="inline-flex h-9 items-center rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-600 md:px-5"
          >
            Register
          </a>
        </div>
      </div>
    </header>
  )
}

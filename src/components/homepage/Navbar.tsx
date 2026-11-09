"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Menu,
  X,
  CalendarCheck,
  PlusCircle,
  Building2,
  LogOut,
  ChevronRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ModeToggle } from "@/components/ModeToggle"
import { authClient } from "@/lib/auth-client"
import Logo from "@/assets/Logo.png"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
]

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track scroll for transparent background on the homepage hero
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isTransparent = isHome && !scrolled && !mobileMenuOpen

  const { data: session } = authClient.useSession()
  const user = session?.user

  const handleSignOut = () => {
    setMobileMenuOpen(false)
    authClient.signOut()
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "sticky top-0 left-0 z-50 w-full transition-all duration-300",
        isTransparent
          ? "bg-transparent text-white border-b border-transparent"
          : "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-xs"
      )}
    >
      <div className="flex h-16 md:h-20 items-center justify-between px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2.5">
          <Image
            src={Logo}
            alt="StudioSpace logo"
            width={36}
            height={36}
            className="size-8 md:size-9 object-contain"
          />
          <span
            className={cn(
              "text-lg md:text-xl font-bold tracking-tight transition-colors",
              isTransparent ? "text-white" : "text-zinc-900 dark:text-white"
              // "text-[rgba(38, 38, 38, 1)]"
            )}
          >
            StudioSpace
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors py-1",
                  isTransparent
                    ? "text-zinc-200 hover:text-white"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white",
                  isActive &&
                    (isTransparent
                      ? "text-white after:bg-indigo-400"
                      : "text-indigo-600 dark:text-indigo-400 after:bg-indigo-600 dark:after:bg-indigo-400"),
                  isActive &&
                    "after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full font-semibold"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Section: Theme Toggle, User Profile / Auth, Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {user ? (
            /* User Popover Profile Card */
            <Popover>
              <PopoverTrigger className="rounded-full ring-2 ring-transparent hover:ring-indigo-500/50 transition-all cursor-pointer">
                <Avatar className="size-9 md:size-10 border border-zinc-200 dark:border-zinc-700">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user?.image as string}
                    alt={user?.name || "User avatar"}
                  />
                  <AvatarFallback className="bg-indigo-600 text-white text-sm font-semibold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="w-64 p-0 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden"
              >
                {/* Header Information */}
                <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
                  <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {user?.email}
                  </p>
                </div>

                {/* Navigation Links */}
                <div className="p-2 space-y-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  <Link
                    href="/myBookings"
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <CalendarCheck className="size-4 text-indigo-500" />
                      My Bookings
                    </span>
                    <ChevronRight className="size-3.5 text-zinc-400" />
                  </Link>

                  <Link
                    href="/add-studio"
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <PlusCircle className="size-4 text-emerald-500" />
                      List a Studio
                    </span>
                    <ChevronRight className="size-3.5 text-zinc-400" />
                  </Link>

                  <Link
                    href="/myStudios"
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Building2 className="size-4 text-purple-500" />
                      My Studios
                    </span>
                    <ChevronRight className="size-3.5 text-zinc-400" />
                  </Link>
                </div>

                {/* Sign Out Action */}
                <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="size-3.5" />
                    Sign Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            /* Guest Auth Buttons (Desktop) */
            <div className="hidden sm:flex items-center gap-2.5">
              <Link
                href="/signIn"
                className={cn(
                  "h-9 items-center rounded-xl px-4 text-xs md:text-sm font-semibold transition-colors border flex",
                  isTransparent
                    ? "bg-white/10 hover:bg-white/20 text-white border-white/20"
                    : "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700"
                )}
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="h-9 inline-flex items-center rounded-xl bg-indigo-600 px-4 text-xs md:text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={cn(
              "lg:hidden p-2 rounded-xl transition-colors cursor-pointer",
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-5 pt-3 pb-6 shadow-xl space-y-4">
          {/* Main Links */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-xl transition-colors",
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* User Links on Mobile (when signed in) */}
          {user ? (
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5">
              <div className="px-3 py-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {user?.name}
                </p>
                <p className="text-[11px] text-zinc-500 truncate">{user?.email}</p>
              </div>

              <Link
                href="/myBookings"
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <CalendarCheck className="size-4 text-indigo-500" />
                My Bookings
              </Link>
              <Link
                href="/add-studio"
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <PlusCircle className="size-4 text-emerald-500" />
                List a Studio
              </Link>
              <Link
                href="/myStudios"
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <Building2 className="size-4 text-purple-500" />
                My Studios
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 mt-2 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-left transition-colors cursor-pointer"
              >
                <LogOut className="size-4" />
                Sign Out
              </button>
            </div>
          ) : (
            /* Auth Buttons on Mobile (when guest) */
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 gap-3">
              <Link
                href="/signIn"
                onClick={closeMobileMenu}
                className="flex items-center justify-center h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={closeMobileMenu}
                className="flex items-center justify-center h-10 rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
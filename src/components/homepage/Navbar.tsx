"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils" // Ensure standard shadcn path
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

import Logo from "@/assets/Logo.png"
import { ModeToggle } from "@/components/ModeToggle"
import { authClient } from "@/lib/auth-client"
import { Button } from "../ui/button"

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // If on homepage and not scrolled yet, keep transparent over hero. 
  // On inner pages or when scrolled, apply theme-aware solid/blurred backgrounds.
  const isTransparent = isHome && !scrolled

  const { data: session } = authClient.useSession()
  const user = session?.user
  const handleSignOut = () => {
    authClient.signOut()
  }

  return (



    <header
      className={cn(
        "sticky top-0 z-50 h-16 w-full transition-all duration-300 md:h-20",
        isTransparent
          ? "bg-transparent text-white border-b border-transparent"
          : "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm"
      )}
    >
      <div className="flex h-full items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 md:gap-3">
          <Image
            src={Logo}
            alt="StudioSpace logo"
            width={40}
            height={40}
            className="size-9 md:size-10"
          />
          <span
            className={cn(
              "text-lg font-bold tracking-tight md:text-xl transition-colors",
              isTransparent
                ? "text-white"
                : "text-zinc-900 dark:text-white"
            )}
          >
            StudioSpace
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white",
                  isActive &&
                  (isTransparent
                    ? "text-white after:bg-indigo-400"
                    : "text-indigo-600 dark:text-indigo-400 after:bg-indigo-600 dark:after:bg-indigo-400"),
                  isActive &&
                  "after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <ModeToggle />


          {
            user ? <Popover>
              <PopoverTrigger render={<Avatar>
                <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>}>
                Open Popover
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>
                    <p>{user?.email}</p>
                    <Link href={'/myBookings'} className="block">
                    My bookings
                    </Link>
                    <Link href={'/add-studio'} className="block">
                    Add Studio
                    </Link>
                    <Link href={'/myStudios'} className="block">
                    My Studios
                    </Link>
                    <Button onClick={handleSignOut} variant={'destructive'}>Sign Out</Button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover> : <>
              <Link
                href="/signIn"
                className={cn(
                  "hidden h-9 items-center rounded-lg px-4 text-sm font-medium transition-colors sm:inline-flex md:px-5 border",
                  isTransparent
                    ? "bg-white/10 hover:bg-white/20 text-white border-white/20"
                    : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800"
                )}
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="inline-flex h-9 items-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-500 shadow-sm md:px-5"
              >
                Register
              </Link>
            </>
          }




        </div>
      </div>
    </header>
  )
}
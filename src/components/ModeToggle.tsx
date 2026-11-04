"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { cn } from "cn"

// Hydration-safe "am I on the client yet" — false during SSR, true after mount.
const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  // Avoid a mismatch between the server render and the resolved theme.
  const isDark = mounted && theme === "dark"

  return (
    <div
      role="group"
      aria-label="Theme"
      className="flex items-center rounded-full bg-neutral-800 p-1"
    >
      <button
        type="button"
        aria-label="Light mode"
        aria-pressed={!isDark}
        onClick={() => setTheme("light")}
        className={cn(
          "flex size-7 items-center justify-center rounded-full transition-colors",
          !isDark ? "bg-white text-amber-500" : "text-white/70 hover:text-white"
        )}
      >
        <Sun className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Dark mode"
        aria-pressed={isDark}
        onClick={() => setTheme("dark")}
        className={cn(
          "flex size-7 items-center justify-center rounded-full transition-colors",
          isDark ? "bg-white text-neutral-900" : "text-white/70 hover:text-white"
        )}
      >
        <Moon className="size-4" />
      </button>
    </div>
  )
}

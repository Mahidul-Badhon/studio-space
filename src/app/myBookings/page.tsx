import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { CalendarRange, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import MyBookingCard from "@/components/booking/MyBookingCard";
import { Booking } from "@/types/booking";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  let bookings: Booking[] = [];

  try {
    if (user?.email) {
      const res = await fetch(`http://localhost:8000/my-bookings/${user.email}`)
      if (res.ok) {
        bookings = await res.json();
      }
    }
  } catch (error) {
    console.error("Failed to load user bookings:", error);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            Reservations
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1">
            My Booked Workspaces
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Track and manage your upcoming production shoot slots
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
            <CalendarRange className="w-12 h-12 mx-auto text-zinc-400 mb-3" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              No reservations yet
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
              You haven&apos;t reserved any creative studios. Explore workspaces to book your next slot.
            </p>
            <Link
              href="/studios"
              className="mt-5 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Explore Studios
            </Link>
          </div>
        ) : (
          /* Bookings List */
          <div className="space-y-4">
            {bookings.map((booking: Booking) => (
              <MyBookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookingsPage;
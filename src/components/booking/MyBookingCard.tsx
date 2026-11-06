"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Clock, DollarSign, XCircle, Building2 } from "lucide-react";
import { Booking } from "@/types/booking";
import { toast } from "../ui/toast";
import { redirect } from "next/navigation";


interface MyBookingCardProps {
  booking: Booking;
}

const MyBookingCard = ({ booking }: MyBookingCardProps) => {
  const handleCancelBooking = async () => {
    
    const res = await fetch(`http://localhost:8000/mybookings/${booking._id}`, {
      method: 'DELETE'
    });
    const data = await res.json()
    console.log(data)
    toast.add({type:"success", description:"Cancelled!"})
    redirect('/myBookings')

  };

  const statusColors = {
    Confirmed:
      "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
    Pending:
      "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
    Cancelled:
      "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800",
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left: Studio Image + Details */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          {/* Studio Image Thumbnail */}
          <div className="relative w-full sm:w-28 h-40 sm:h-24 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shrink-0">
            {booking.image ? (
              <Image
                src={booking.image}
                alt={booking.studioTitle}
                fill
                sizes="(max-width: 640px) 100vw, 112px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                <Building2 className="w-8 h-8" />
              </div>
            )}
          </div>

          {/* Booking Info */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                {booking.studioTitle}
              </h3>
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${
                  statusColors[booking.status] || statusColors.Pending
                }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                {booking.bookingDate}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                {booking.startTime} ({booking.hours} hr{booking.hours > 1 ? "s" : ""})
              </span>

              <span className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-white">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                ${booking.totalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Cancel Button */}
        <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800/80">
          <button
            type="button"
            onClick={handleCancelBooking}
            disabled={booking.status === "Cancelled"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <XCircle className="w-3.5 h-3.5" />
            {booking.status === "Cancelled" ? "Cancelled" : "Cancel Booking"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyBookingCard;
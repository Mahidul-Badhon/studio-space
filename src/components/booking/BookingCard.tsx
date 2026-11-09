"use client";

import React, { useState } from "react";
import { X, Calendar, Clock } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "../ui/toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface Studio {
    _id: string;
    title: string;
    hourlyRate: number;
    imageUrl: string;
    securityDeposit?: number;
    location?: string;
    isAvailable?: boolean;
}

const BookingCard = ({ studio }: { studio: Studio }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [bookingDate, setBookingDate] = useState("");
    const [startTime, setStartTime] = useState("10:00");
    const [hours, setHours] = useState(2);

    const { data: session } = authClient.useSession()
    const user = session?.user

    // Price calculation
    const hourlyTotal = studio.hourlyRate * hours;
    const deposit = studio.securityDeposit || 0;
    const totalPrice = hourlyTotal + deposit;

    // Check if studio is marked available
    const isAvailable = studio.isAvailable !== false;

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const bookingData = {
            userName: user?.name,
            email: user?.email,
            image: studio.imageUrl,
            studioId: studio._id,
            studioTitle: studio.title,
            bookingDate,
            bookingTime: new Date(),
            startTime,
            hours,
            totalPrice,
            status: "Pending",
        };

        console.log("Submitting booking data to database:", bookingData);

        const token = await getTokenFromClient()
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            
            },
            body: JSON.stringify(bookingData),
        });


        if (!res.ok) {
            let errorMsg = "Change time! It's already booked";
            try {
                const errData = await res.json();
                if (errData.message) errorMsg = errData.message;
            } catch {
                // In case server sent non-JSON / HTML 500 page
            }
            toast.add({ type: "error", description: errorMsg });
            return;
        }
        const bookingRes = await res.json()
        if (!bookingRes.success) {
            toast.add({
                type: "error",
                description: "Change time! It's already booked.",
            });
            return;
        }
        toast.add({ type: "success", description: "Booked Successfully!" })


        setIsOpen(false);
    };

    return (
        <div className="lg:col-span-4">
            {/* Sticky Right-side Pricing Card */}
            <div className="sticky top-28 p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-5">
                <div className="flex items-baseline justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    <div>
                        <span className="text-3xl font-black text-zinc-900 dark:text-white">
                            ${studio.hourlyRate}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-1 font-medium">
                            / hour
                        </span>
                    </div>
                    <span
                        className={`text-xs px-2.5 py-1 rounded-md border font-semibold ${isAvailable
                                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                                : "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
                            }`}
                    >
                        {isAvailable ? "Available" : "Unavailable"}
                    </span>
                </div>

                <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <div className="flex justify-between">
                        <span>Security Deposit</span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                            ${deposit}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Liability Protection</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            Included free
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Cancellation Policy</span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                            Flexible (24h)
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    disabled={!isAvailable}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all"
                >
                    {isAvailable ? "Book Workspace Now" : "Currently Unavailable"}
                </button>
            </div>

            {/* Booking Dialog Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-7 text-zinc-900 dark:text-zinc-100">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Header */}
                        <div className="mb-5">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                                Reserve Studio Slot
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                                {studio.title}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            {/* Date Input */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                                    Booking Date *
                                </label>
                                <input
                                    type="date"
                                    required
                                    min={new Date().toISOString().split("T")[0]}
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Start Time & Duration */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                                        Start Time *
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                        Duration (Hours) *
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="24"
                                        required
                                        value={hours}
                                        onChange={(e) => setHours(Math.max(1, Number(e.target.value)))}
                                        className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Price Calculation Box */}
                            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-2 text-xs">
                                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                    <span>
                                        Rate: ${studio.hourlyRate} &times; {hours} hr{hours > 1 ? "s" : ""}
                                    </span>
                                    <span>${hourlyTotal}</span>
                                </div>
                                {deposit > 0 && (
                                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                        <span>Security Deposit (Refundable)</span>
                                        <span>${deposit}</span>
                                    </div>
                                )}
                                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex justify-between font-bold text-sm text-zinc-900 dark:text-white">
                                    <span>Total Due</span>
                                    <span className="text-indigo-600 dark:text-indigo-400">
                                        ${totalPrice}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="w-1/2 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-colors"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingCard;
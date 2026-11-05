import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  CheckCircle, 
  ArrowLeft 
} from 'lucide-react';
import StudioGalleryCarousel from '@/components/StudioGalleryCarousel';
import BookingCard from '@/components/booking/BookingCard';


const StudioDetailsPage = async({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    

        const res = await fetch(`http://localhost:8000/studios/${id}`)
            const studio = await res.json(); 

    if (!studio) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white">
                <h2 className="text-2xl font-bold">Studio Space Not Found</h2>
                <p className="text-sm text-zinc-500 mt-2">The studio listing may have been unlisted or removed.</p>
                <Link 
                    href="/studios"
                    className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
                >
                    Back to Studios
                </Link>
            </div>
        );
    }

    // Resolve images list: check studio.images array, fallback to single studio.imageUrl
    const studioImages: string[] = studio.images && studio.images.length > 0
        ? studio.images
        : studio.imageUrl
        ? [studio.imageUrl]
        : [];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors py-10 px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Back Link */}
                <Link 
                    href="/studios" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to all studios
                </Link>

                {/* Top Title & Header Info */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                                {studio.category || "Creative Studio"}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                                <Star className="w-3.5 h-3.5 fill-amber-500" />
                                4.9 (24 Reviews)
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                            {studio.title}
                        </h1>
                        <p className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                            <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                            {studio.location}
                        </p>
                    </div>

                    <div className="hidden md:block">
                        <button
                            type="button"
                            className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5"
                        >
                            Book Workspace Now
                        </button>
                    </div>
                </div>

                {/* Gallery Carousel (Replaces single static image) */}
                <StudioGalleryCarousel images={studioImages} title={studio.title} />

                {/* Main Content & Right-Side Booking Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                    
                    {/* Left Column: Specs, Overview, Amenities, Reviews */}
                    <div className="lg:col-span-8 space-y-10">
                        
                        {/* Quick Specs Bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                            <div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Hourly Rate</p>
                                <p className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">
                                    ${studio.hourlyRate}/hr
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Security Deposit</p>
                                <p className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">
                                    ${studio.securityDeposit || 0}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Capacity</p>
                                <p className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">
                                    {studio.maxCapacity || "Open"} Guests
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Category</p>
                                <p className="text-base font-bold text-zinc-900 dark:text-white mt-0.5 truncate">
                                    {studio.category}
                                </p>
                            </div>
                        </div>

                        {/* Detailed Overview */}
                        <div className="space-y-3">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                About this Workspace
                            </h2>
                            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                                {studio.overview}
                            </p>
                        </div>

                        {/* Amenities List */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-500" />
                                Included Amenities & Gear
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {studio.amenities?.map((amenity: string) => (
                                    <div
                                        key={amenity}
                                        className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm font-medium"
                                    >
                                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Host Information */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-4">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                                Studio Host Details
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-extrabold text-lg flex items-center justify-center">
                                    {studio.ownerName ? studio.ownerName.charAt(0) : "H"}
                                </div>
                                <div>
                                    <h4 className="font-bold text-base text-zinc-900 dark:text-white">
                                        {studio.ownerName || "Studio Host"}
                                    </h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {studio.ownerEmail}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                                        <ShieldCheck className="w-3.5 h-3.5" /> Verified Host
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                Creator Reviews
                            </h2>
                            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-sm">Sophia Miller</span>
                                    <span className="text-xs text-zinc-400">2 days ago</span>
                                </div>
                                <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                                    Exceptional space! The continuous lighting package and ceiling grid made our production shoot run smoothly ahead of schedule.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Pricing & Booking Action Card */}
                    <BookingCard studio={studio}></BookingCard>

                </div>

            </div>
        </div>
    );
};

export default StudioDetailsPage;
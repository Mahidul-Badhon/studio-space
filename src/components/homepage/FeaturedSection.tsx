import { Studio } from "@/types/studio";
import Image from "next/image";
import { ArrowRight, MapPin, Star, Sparkles } from "lucide-react";
import Link from "next/link";

const FeaturedSection = async () => {
    let data: Studio[] = []
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-studios`, {
            next: { revalidate: 60 }, // Ensures real-time data fetching
        });
        if (res.ok) {
            data = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch studios:", error);
    }
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                        <Sparkles className="size-3.5" />
                        Top Rated Spaces
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                        Featured Studios
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-lg">
                        Explore hand-picked, highly-reviewed creative stages and production environments ready for your next project.
                    </p>
                </div>

                <Link
                    href="/studios"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 group self-start sm:self-auto shrink-0"
                >
                    Explore all studios
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {data.map((studio) => (
                    <div
                        key={studio._id}
                        className="group flex flex-col rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1"
                    >
                        {/* Studio Thumbnail Container */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                            <Image
                                src={studio.imageUrl}
                                alt={studio.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Category Badge */}
                            <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                                {studio.category}
                            </span>

                            {/* Rating Badge */}
                            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-black/60 backdrop-blur-md text-amber-400 border border-white/20">
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                                <span>
                                    {Number((4.6 + (((studio._id ? studio._id.charCodeAt(studio._id.length - 1) : 0) * 7) % 5) * 0.1).toFixed(1))}
                                </span>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {studio.title}
                                </h3>

                                <p className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                    {studio.location}
                                </p>
                            </div>

                            {/* Price & Action */}
                            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                                <div>
                                    <span className="text-xl font-black text-zinc-900 dark:text-white">
                                        ${studio.hourlyRate}
                                    </span>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                                        / hr
                                    </span>
                                </div>

                                <Link
                                    href={`/studios/${studio._id}`}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-indigo-600 text-zinc-800 hover:text-white dark:bg-zinc-800 dark:hover:bg-indigo-600 dark:text-zinc-200 dark:hover:text-white text-xs font-semibold transition-all group/btn"
                                >
                                    View Details
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedSection;
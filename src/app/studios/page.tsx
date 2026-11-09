import StudiosExplorer, { Studio } from '@/components/cards/StudioExplorer';


const StudiosPage = async() => {
    let data: Studio[] = [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
            next: { revalidate: 60 }, // Ensures real-time data fetching
        });
        if (res.ok) {
            data = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch studios:", error);
    }

    return (
        <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors py-12 px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Page Title & Intro */}
                <div>
                    <p className="text-xs sm:text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                        Production Workspaces
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-white">
                        Explore Creative Studios
                    </h1>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
                        Discover and book photo cycloramas, film sound stages, podcast rooms, and rehearsal suites available on demand.
                    </p>
                </div>

                {/* Filterable Studios Grid */}
                <StudiosExplorer initialStudios={data} />
            </div>
        </div>
    );
};

export default StudiosPage;
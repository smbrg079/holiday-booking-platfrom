
export default function Loading() {
    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 animate-pulse">
                    <div>
                        <div className="h-10 w-64 bg-slate-200 rounded-xl mb-2"></div>
                        <div className="h-5 w-32 bg-slate-200 rounded-xl"></div>
                    </div>
                    <div className="h-12 w-32 bg-slate-200 rounded-xl"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Skeleton */}
                    <aside className="lg:w-64 shrink-0 space-y-10 hidden lg:block animate-pulse">
                        <div className="space-y-4">
                            <div className="h-5 w-32 bg-slate-200 rounded-lg mb-6"></div>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-4 w-full bg-slate-200 rounded-lg"></div>
                            ))}
                        </div>
                    </aside>

                    {/* Grid Skeleton */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm animate-pulse flex flex-col h-[500px]">
                                <div className="h-64 bg-slate-200"></div>
                                <div className="p-6 flex-1 space-y-4">
                                    <div className="h-4 w-24 bg-slate-200 rounded-lg"></div>
                                    <div className="h-8 w-3/4 bg-slate-200 rounded-xl"></div>
                                    <div className="h-4 w-full bg-slate-200 rounded-lg"></div>
                                    <div className="mt-auto pt-6 flex justify-between items-center">
                                        <div className="h-8 w-24 bg-slate-200 rounded-lg"></div>
                                        <div className="h-12 w-12 bg-slate-200 rounded-xl"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

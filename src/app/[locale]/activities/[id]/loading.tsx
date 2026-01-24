
export default function Loading() {
    return (
        <div className="pt-24 pb-16 bg-white animate-pulse">
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <div className="h-4 w-64 bg-slate-200 rounded-lg"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="h-12 w-3/4 bg-slate-200 rounded-2xl mb-4"></div>
                <div className="flex gap-4">
                    <div className="h-6 w-24 bg-slate-200 rounded-lg"></div>
                    <div className="h-6 w-32 bg-slate-200 rounded-lg"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="h-[500px] w-full bg-slate-200 rounded-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-8">
                    <div className="h-8 w-48 bg-slate-200 rounded-xl"></div>
                    <div className="space-y-4">
                        <div className="h-4 w-full bg-slate-200 rounded-lg"></div>
                        <div className="h-4 w-full bg-slate-200 rounded-lg"></div>
                        <div className="h-4 w-2/3 bg-slate-200 rounded-lg"></div>
                    </div>
                </div>
                <div className="h-96 bg-slate-200 rounded-[2.5rem]"></div>
            </div>
        </div>
    )
}

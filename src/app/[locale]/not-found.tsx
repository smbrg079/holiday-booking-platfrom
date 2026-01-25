import { Link } from '@/i18n/routing'
import { MapPin, Search } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md w-full">
                <div className="mb-8 relative w-64 h-64 mx-auto bg-indigo-50 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full text-indigo-200" fill="currentColor" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" />
                        </svg>
                    </div>
                    <MapPin size={80} className="text-indigo-600 relative z-10" />
                </div>

                <h1 className="text-9xl font-black text-slate-200 leading-none mb-0">404</h1>
                <h2 className="text-2xl font-bold text-slate-900 -mt-8 mb-4 relative z-10">Destination Not Found</h2>
                <p className="text-slate-500 mb-10 text-lg">
                    Looks like this spot isn&apos;t on our map yet. Let&apos;s get you back to familiar territory.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="block w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center space-x-2"
                    >
                        <span>Back to Home</span>
                    </Link>
                    <Link
                        href="/destinations"
                        className="block w-full py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center space-x-2"
                    >
                        <Search size={20} />
                        <span>Browse Destinations</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

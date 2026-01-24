'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { AlertTriangle, ArrowLeft, RefreshCcw } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    React.useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 text-center shadow-2xl border border-slate-100">
                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <AlertTriangle size={40} />
                </div>

                <h1 className="text-3xl font-black text-slate-900 mb-4">Something went wrong</h1>
                <p className="text-slate-500 mb-10 leading-relaxed">
                    We encountered an unexpected error. Don&apos;t worry, our team has been notified.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => reset()}
                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100"
                    >
                        <RefreshCcw size={18} />
                        <span>Try Again</span>
                    </button>

                    <Link
                        href="/"
                        className="w-full py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl flex items-center justify-center space-x-2 hover:bg-slate-200 transition-all"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

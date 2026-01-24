import { Link } from '@/i18n/routing'
import { CheckCircle2, Home, LayoutDashboard } from 'lucide-react'

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-12 text-center">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={48} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-4">Payment Successful!</h1>
                <p className="text-slate-500 mb-10 text-lg">
                    Your booking has been confirmed. A confirmation email has been sent to you.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/dashboard"
                        className="block w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center space-x-2"
                    >
                        <LayoutDashboard size={20} />
                        <span>Go to Dashboard</span>
                    </Link>
                    <Link
                        href="/"
                        className="block w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center space-x-2"
                    >
                        <Home size={20} />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

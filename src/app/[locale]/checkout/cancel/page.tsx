import { Link } from '@/i18n/routing'
import { XCircle, ArrowLeft } from 'lucide-react'

export default function CancelPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-12 text-center">
                <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <XCircle size={48} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-4">Payment Cancelled</h1>
                <p className="text-slate-500 mb-10 text-lg">
                    Your payment was not processed. No charges were made to your account.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="block w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center space-x-2"
                    >
                        <ArrowLeft size={20} />
                        <span>Return Home</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

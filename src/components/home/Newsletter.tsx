'use client'

import React, { useState } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Newsletter() {
    const t = useTranslations('Homepage');
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStatus('loading')

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setStatus('success')
        setEmail('')
    }

    if (status === 'success') {
        return (
            <div className="bg-white/10 backdrop-blur-xl p-12 rounded-[3rem] border border-white/20 text-center max-w-3xl mx-auto animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="text-white" size={40} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{t('newsletterSuccessTitle')}</h3>
                <p className="text-indigo-100 text-lg">{t('newsletterSuccessSubtitle')}</p>
            </div>
        )
    }

    return (
        <div className="bg-white/10 backdrop-blur-xl p-12 md:p-16 rounded-[3rem] border border-white/20 max-w-5xl mx-auto shadow-2xl relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl group-hover:bg-indigo-400/20 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="text-center md:text-left flex-1">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t('newsletterTitle')}</h2>
                    <p className="text-indigo-100 text-lg">{t('newsletterSubtitle')}</p>
                </div>

                <div className="w-full md:w-auto flex-1">
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('newsletterPlaceholder')}
                            className="flex-1 px-8 py-5 bg-white rounded-2xl focus:ring-4 focus:ring-white/20 outline-none text-slate-900 font-bold placeholder:text-slate-400 shadow-xl"
                        />
                        <button
                            disabled={status === 'loading'}
                            className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center space-x-3 group/btn"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>{t('newsletterSubscribe')}</span>
                                    <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                    <p className="mt-4 text-xs text-indigo-200 text-center md:text-left font-medium opacity-60">
                        {t('newsletterNoSpam')}
                    </p>
                </div>
            </div>
        </div>
    )
}

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

        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()

            if (res.ok) {
                setStatus('success')
                setEmail('')
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
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
        <div className="bg-transparent p-12 md:p-20 rounded-[4rem] border border-white/30 max-w-6xl mx-auto relative overflow-hidden group">
            <div className="relative z-10 flex flex-col items-center gap-12 text-center text-white">
                <div className="space-y-6 max-w-3xl">
                    <h2 className="text-4xl md:text-7xl font-serif italic drop-shadow-2xl leading-tight">
                        {t('newsletterTitle')}
                    </h2>
                    <p className="text-white/80 text-lg md:text-2xl font-medium drop-shadow-lg">
                        {t('newsletterSubtitle')}
                    </p>
                </div>

                <div className="w-full max-w-2xl">
                    {status === 'error' && (
                        <p className="mb-4 text-amber-200 text-sm font-medium" role="alert">
                            {t('newsletterError')}
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
                            placeholder={t('newsletterPlaceholder')}
                            className="flex-1 px-8 py-5 bg-transparent border border-white/40 rounded-2xl outline-none text-white font-bold placeholder:text-white/40 focus:border-white transition-all text-lg"
                        />
                        <button
                            disabled={status === 'loading'}
                            className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-amber-400 transition-all shadow-2xl flex items-center justify-center space-x-3 shrink-0 group/btn"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span className="uppercase tracking-[0.2em] text-xs">{t('newsletterSubscribe')}</span>
                                    <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                    <p className="mt-8 text-[11px] text-white/50 font-black uppercase tracking-[0.3em] drop-shadow-md">
                        {t('newsletterNoSpam')}
                    </p>
                </div>
            </div>
        </div>
    )
}

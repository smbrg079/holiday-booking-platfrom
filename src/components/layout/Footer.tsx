'use client'

import React, { useState } from 'react'
import { Link } from '@/i18n/routing'
import { Facebook, Instagram, Twitter, Youtube, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

const Footer = () => {
    const t = useTranslations('Footer');
    const nt = useTranslations('Navbar');
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || 'Something went wrong')

            setStatus('success')
            setMessage(data.message)
            setEmail('')
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Something went wrong'
            setStatus('error')
            setMessage(message)
        }
    }

    return (
        <footer className="bg-slate-900 pt-24 pb-12 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-8">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">H</span>
                            </div>
                            <span className="text-2xl font-bold">HolidaySync</span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed mb-8">
                            {t('description')}
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                <Facebook size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                <Youtube size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-8">{t('quickLinks')}</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="/destinations" className="hover:text-white transition-colors">{nt('destinations')}</Link></li>
                            <li><Link href="/activities" className="hover:text-white transition-colors">{nt('activities')}</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">{nt('about')}</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">{nt('contact')}</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-bold mb-8">{t('categories')}</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="/activities?category=Adventure" className="hover:text-white transition-colors">Adventure</Link></li>
                            <li><Link href="/activities?category=Relaxation" className="hover:text-white transition-colors">Relaxation</Link></li>
                            <li><Link href="/activities?category=Culture" className="hover:text-white transition-colors">Culture</Link></li>
                            <li><Link href="/activities?category=Nature" className="hover:text-white transition-colors">Nature & Wildlife</Link></li>
                            <li><Link href="/activities?category=Food" className="hover:text-white transition-colors">Food & Drink</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold mb-8">{t('newsletter')}</h4>
                        <p className="text-slate-400 mb-6 text-sm">{t('newsletterSubtitle')}</p>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('emailPlaceholder') || 'Email Address'}
                                required
                                className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-600 text-sm outline-none transition-all"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className="px-6 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {status === 'loading' ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : status === 'success' ? (
                                    <span className="flex items-center"><CheckCircle size={18} className="mr-2" /> {t('subscribed') || 'Subscribed'}</span>
                                ) : (
                                    t('subscribe')
                                )}
                            </button>
                            {status === 'error' && (
                                <p className="text-rose-500 text-xs flex items-center mt-2">
                                    <AlertCircle size={12} className="mr-1" /> {message}
                                </p>
                            )}
                            {status === 'success' && (
                                <p className="text-emerald-500 text-xs flex items-center mt-2">
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-slate-500">
                    <p>{t('copyright')}</p>
                    <div className="flex space-x-8">
                        <Link href="/terms" className="hover:text-white transition-colors">{t('terms') || 'Terms of Service'}</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">{t('privacy') || 'Privacy Policy'}</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">{t('cookie') || 'Cookie Policy'}</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

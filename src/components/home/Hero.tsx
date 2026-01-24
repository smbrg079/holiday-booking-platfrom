'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'

interface Props {
    destinations: { id: string, name: string }[]
    categories: { id: string, name: string }[]
}

const Hero = ({ destinations, categories }: Props) => {
    const t = useTranslations('Hero');
    const dt = useTranslations('Database');
    const router = useRouter();

    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (location) params.append('destination', location);
        if (category) params.append('category', category);
        // Date filtering could be implemented on the activities page if desired
        router.push(`/activities?${params.toString()}`);
    }

    const scrollToHowItWorks = () => {
        const element = document.getElementById('how-it-works');
        element?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-900/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span>{t('badge')}</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                >
                    {t('titleMain')} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                        {t('titleAccent')}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {t('subtitle')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                >
                    <button
                        onClick={() => router.push('/activities')}
                        className="group relative px-8 py-4 bg-indigo-600 hover:bg-slate-900 text-white rounded-full font-bold transition-all shadow-xl shadow-indigo-500/25 flex items-center"
                    >
                        {t('cta')}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={scrollToHowItWorks}
                        className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-full font-bold transition-all flex items-center shadow-xl"
                    >
                        <Play className="mr-2 w-5 h-5 fill-slate-900" />
                        {t('secondaryCta')}
                    </button>
                </motion.div>

                {/* Quick Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 w-full max-w-4xl mx-auto p-2 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 border border-white/20"
                >
                    <div className="flex-1 flex items-center px-8 py-5 border-r border-slate-100 hover:bg-slate-50 transition-colors rounded-3xl">
                        <MapPin className="text-indigo-500 mr-4" size={24} />
                        <div className="text-left flex-1">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-600 mb-1">{t('location')}</p>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-bold placeholder:text-slate-300 w-full appearance-none cursor-pointer"
                            >
                                <option value="">{t('where')}</option>
                                {destinations.map(dest => (
                                    <option key={dest.id} value={dest.name}>{dt(dest.name)}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center px-8 py-5 border-r border-slate-100 hover:bg-slate-50 transition-colors">
                        <div className="text-left flex-1">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-600 mb-1">{t('type')}</p>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-bold w-full appearance-none cursor-pointer"
                            >
                                <option value="">{t('all')}</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{dt(cat.name)}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center px-8 py-5 mr-2 hover:bg-slate-50 transition-colors">
                        <div className="text-left flex-1">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-600 mb-1">{t('date')}</p>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-bold w-full cursor-pointer"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSearch}
                        className="w-full md:w-auto px-10 py-5 bg-slate-900 text-white rounded-3xl font-black hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
                    >
                        {t('search')}
                    </button>
                </motion.div>
            </div>
        </div>
    )
}

export default Hero

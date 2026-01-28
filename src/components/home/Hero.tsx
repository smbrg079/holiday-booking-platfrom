'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Play, MapPin, Search as SearchIcon, Calendar, Compass } from 'lucide-react'
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
        router.push(`/activities?${params.toString()}`);
    }

    const scrollToHowItWorks = () => {
        const element = document.getElementById('how-it-works');
        element?.scrollIntoView({ behavior: 'smooth' });
    }

    const HERO_IMAGE = "/images/home-hero.jpg";

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 font-sans">
            {/* Background Image - Absolute focus, minimal dimming */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={HERO_IMAGE}
                    alt="Traditional Moroccan Riad and Planning Table"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Thin, high-end gradient for bottom shadow only */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>

            {/* Main Hero Content - Minimal & Efficient */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-end pb-12 sm:pb-24">

                {/* Traditional & Elegant Heading Group */}
                <div className="text-center mb-10 w-full max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-8xl font-serif italic text-white mb-10 leading-[1.1] drop-shadow-2xl tracking-normal text-slate-100"
                    >
                        {t('titleMain')} <br />
                        <span className="text-amber-400 font-sans not-italic font-black uppercase text-xl md:text-3xl tracking-[0.5em] block mt-6 opacity-95">
                            {t('titleAccent')}
                        </span>
                    </motion.h1>

                    {/* Glassmorphic Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap items-center justify-center gap-4 mb-12"
                    >
                        <button
                            onClick={() => router.push('/activities')}
                            className="flex items-center gap-3 px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all duration-500 shadow-2xl"
                        >
                            {t('cta')} <ArrowRight size={16} />
                        </button>
                        <button
                            onClick={scrollToHowItWorks}
                            className="flex items-center gap-3 px-8 py-3.5 bg-slate-900/40 backdrop-blur-md border border-white/10 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-500"
                        >
                            <Play size={16} className="fill-white" /> {t('secondaryCta')}
                        </button>
                    </motion.div>
                </div>

                {/* Modern & Efficient Search Bar (Simplified Design) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="w-full max-w-5xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 bg-transparent rounded-[2.5rem] overflow-hidden items-center p-3 gap-1 border border-white/30 shadow-2xl">
                        {/* Location */}
                        <div className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors rounded-2xl group border-b md:border-b-0 md:border-r border-white/20">
                            <MapPin className="text-amber-400 mr-4 shrink-0" size={20} />
                            <div className="flex-1 min-w-0">
                                <span className="block text-[10px] uppercase tracking-widest font-black text-amber-400 mb-1">Explore</span>
                                <select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="bg-transparent border-none focus:ring-0 p-0 text-white font-bold text-sm w-full outline-none appearance-none cursor-pointer truncate [&>option]:text-slate-900"
                                >
                                    <option value="">Where to?</option>
                                    {destinations.map(dest => (
                                        <option key={dest.id} value={dest.name}>{dt(dest.name)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors rounded-2xl border-b md:border-b-0 md:border-r border-white/20">
                            <Compass className="text-amber-400 mr-4 shrink-0" size={20} />
                            <div className="flex-1 min-w-0">
                                <span className="block text-[10px] uppercase tracking-widest font-black text-amber-400 mb-1">Activity</span>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="bg-transparent border-none focus:ring-0 p-0 text-white font-bold text-sm w-full outline-none appearance-none cursor-pointer truncate [&>option]:text-slate-900"
                                >
                                    <option value="">All Types</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{dt(cat.name)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors rounded-2xl border-b md:border-b-0 border-white/20">
                            <Calendar className="text-amber-400 mr-4 shrink-0" size={20} />
                            <div className="flex-1 min-w-0 pointer-events-none sm:pointer-events-auto">
                                <span className="block text-[10px] uppercase tracking-widest font-black text-amber-400 mb-1">When</span>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="bg-transparent border-none focus:ring-0 p-0 text-white font-bold text-sm w-full cursor-pointer outline-none [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        {/* Search Action */}
                        <div className="p-1">
                            <button
                                onClick={handleSearch}
                                className="w-full h-full py-4 bg-slate-900/90 text-white rounded-[1.5rem] font-black text-sm hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-2xl backdrop-blur-md border border-white/10"
                            >
                                <SearchIcon size={18} />
                                <span>Find Trips</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Hero

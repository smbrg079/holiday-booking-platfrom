'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

const Hero = () => {
    const t = useTranslations('Hero');

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
                    <button className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-indigo-500/25 flex items-center">
                        {t('cta')}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-full font-semibold transition-all flex items-center">
                        <Play className="mr-2 w-5 h-5 fill-slate-900" />
                        {t('secondaryCta')}
                    </button>
                </motion.div>

                {/* Quick Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 w-full max-w-4xl mx-auto p-2 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2"
                >
                    <div className="flex-1 flex items-center px-6 py-4 border-r border-slate-100 hover:bg-slate-50 transition-colors rounded-l-[1.5rem]">
                        <MapPin className="text-slate-400 mr-3" size={20} />
                        <div className="text-left">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{t('location')}</p>
                            <input
                                type="text"
                                placeholder={t('where')}
                                className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-medium placeholder:text-slate-300 w-full"
                            />
                        </div>
                    </div>

                    <div className="flex-1 flex items-center px-6 py-4 border-r border-slate-100 hover:bg-slate-50 transition-colors">
                        <div className="text-left">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{t('type')}</p>
                            <select className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-medium w-full">
                                <option>{t('all')}</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center px-6 py-4 mr-2 hover:bg-slate-50 transition-colors">
                        <div className="text-left">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{t('date')}</p>
                            <input
                                type="date"
                                className="bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-medium w-full"
                            />
                        </div>
                    </div>

                    <button className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] font-bold hover:bg-black transition-colors">
                        {t('search')}
                    </button>
                </motion.div>
            </div>
        </div>
    )
}

export default Hero

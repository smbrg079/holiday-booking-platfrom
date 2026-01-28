'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sun, History, Compass, Palmtree } from 'lucide-react'
import { useTranslations } from 'next-intl'

const PromotedDestinations = () => {
    const t = useTranslations('Promoted')
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const destinations = [
        {
            name: "Agadir",
            slug: "Agadir",
            title: t('Agadir_title'),
            description: t('Agadir_desc'),
            image: "/images/agadir.png",
            color: "from-sky-400 via-blue-500 to-indigo-600",
            icon: Palmtree,
            stats: [t('Agadir_stat1'), t('Agadir_stat2'), t('Agadir_stat3')]
        },
        {
            name: "Taroudant",
            slug: "Taroudant",
            title: t('Taroudant_title'),
            description: t('Taroudant_desc'),
            image: "/images/taroudant.png",
            color: "from-orange-400 via-rose-500 to-red-600",
            icon: History,
            stats: [t('Taroudant_stat1'), t('Taroudant_stat2'), t('Taroudant_stat3')]
        }
    ]

    return (
        <section ref={containerRef} className="py-40 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-32"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-lg text-amber-600 text-xs font-black uppercase tracking-widest mb-6">
                        <Compass size={14} />
                        Curated Highlights
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
                        {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">{t('accent')}</span>
                    </h2>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="space-y-48">
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={dest.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-100px", once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-32`}
                        >
                            {/* Image Container */}
                            <div className="w-full lg:w-3/5 relative group">
                                <div className={`absolute -inset-6 bg-gradient-to-r ${dest.color} rounded-[4rem] opacity-10 blur-3xl transition-opacity duration-1000 group-hover:opacity-20`} />
                                <motion.div
                                    className="relative h-[500px] md:h-[650px] w-full rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100"
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent " />

                                    <div className="absolute bottom-10 left-10 right-10 flex flex-wrap gap-4">
                                        {dest.stats.map((stat, i) => (
                                            <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl text-white text-sm font-black uppercase tracking-widest">
                                                {stat}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-2/5 text-center lg:text-left">
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <div className={`inline-flex items-center gap-3 font-black text-sm mb-8 uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r ${dest.color}`}>
                                        <dest.icon size={20} className="text-slate-900" />
                                        <span>{dest.name}</span>
                                    </div>

                                    <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter">
                                        {dest.title}
                                    </h3>

                                    <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-12 font-medium">
                                        {dest.description}
                                    </p>

                                    <Link href={`/destinations/${dest.slug}`} >
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`group inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-full font-black text-lg shadow-2xl hover:bg-indigo-600 transition-all`}
                                        >
                                            {t('explore', { name: dest.name })}
                                            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PromotedDestinations

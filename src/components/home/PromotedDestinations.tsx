'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sun, History } from 'lucide-react'

const PromotedDestinations = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

    const destinations = [
        {
            name: "Agadir",
            slug: "Agadir",
            title: "The Jewel of the Atlantic",
            description: "Experience the golden sands and endless sunshine where the Atlas Mountains meet the ocean.",
            image: "https://images.unsplash.com/photo-1542345759-3d120afa748d?q=80&w=2670&auto=format&fit=crop",
            color: "from-sky-500 to-blue-600",
            icon: Sun,
            stats: ["300 Days of Sun", "10km Beach", "World Class Golf"]
        },
        {
            name: "Taroudant",
            slug: "Taroudant",
            title: "The Grandmother of Marrakech",
            description: "Step back in time within the magnificent red-mud walls and explore the authentic Berber soul of Morocco.",
            image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2670&auto=format&fit=crop",
            color: "from-orange-500 to-red-700",
            icon: History,
            stats: ["16th Century Walls", "Authentic Souks", "Berber Culture"]
        }
    ]

    return (
        <section ref={containerRef} className="py-32 bg-slate-950 overflow-hidden relative">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Hidden Gems</span>
                    </h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                        Journey beyond the ordinary and explore the unique character of our most treasured destinations.
                    </p>
                </motion.div>

                <div className="space-y-32">
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={dest.name}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
                        >
                            {/* Image Container with Parallax Effect */}
                            <div className="w-full lg:w-3/5 relative group">
                                <div className={`absolute -inset-4 bg-gradient-to-r ${dest.color} rounded-[3rem] opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-1000`} />
                                <motion.div
                                    className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* Floating Stats */}
                                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                                        {dest.stats.map((stat, i) => (
                                            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-sm font-semibold">
                                                {stat}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-2/5 text-center lg:text-left">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <div className={`inline-flex items-center justify-center lg:justify-start gap-2 text-transparent bg-clip-text bg-gradient-to-r ${dest.color} font-bold text-lg mb-4`}>
                                        <dest.icon size={24} className={`text-${dest.color.split('-')[1]}-500`} />
                                        <span className="uppercase tracking-widest">{dest.name}</span>
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                        {dest.title}
                                    </h3>

                                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                        {dest.description}
                                    </p>

                                    <Link href={`/destinations/${dest.slug}`} >
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`group inline-flex items-center gap-3 bg-gradient-to-r ${dest.color} text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition-all`}
                                        >
                                            Explore {dest.name}
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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

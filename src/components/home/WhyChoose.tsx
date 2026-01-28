'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Globe, ShieldCheck, Compass } from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
    Globe,
    ShieldCheck,
    Compass,
    Sparkles
};

interface Feature {
    title: string
    desc: string
    iconName: string
    color: string
    bg: string
}

interface WhyChooseProps {
    title: React.ReactNode
    subtitle: string
    features: Feature[]
}

const WhyChoose = ({ title, subtitle, features }: WhyChooseProps) => {
    return (
        <section className="py-40 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="relative">

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative h-[650px] w-full rounded-[4rem] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.15)] border border-slate-100"
                        >
                            <Image
                                src="/images/moroccan-artisan.png"
                                alt="Moroccan Artisan Craftsmanship"
                                fill
                                className="object-cover"
                            />

                            <div className="absolute bottom-10 left-10 p-1 bg-white/20 backdrop-blur-3xl rounded-[2.5rem] border border-white/30 shadow-2xl">
                                <div className="bg-white px-8 py-6 rounded-[2rem] flex items-center gap-5">
                                    <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                                        <Sparkles size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Trusted Globally</p>
                                        <p className="text-2xl font-black text-slate-900 tracking-tight">50K+ Travelers</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="space-y-16">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-600 text-xs font-black uppercase tracking-widest mb-6">
                                <ShieldCheck size={14} />
                                Your Trusted Partner
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter">
                                {title}
                            </h2>
                            <p className="text-slate-500 text-xl font-medium leading-relaxed">
                                {subtitle}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-10">
                            {features.map((feature, i) => {
                                const IconComponent = ICON_MAP[feature.iconName] || Globe;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex gap-8 group"
                                    >
                                        <div className={`w-20 h-20 shrink-0 ${feature.bg} ${feature.color} rounded-[1.5rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl shadow-slate-100 group-hover:shadow-indigo-100`}>
                                            <IconComponent size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors uppercase text-sm tracking-widest">{feature.title}</h3>
                                            <p className="text-slate-500 font-medium leading-relaxed text-lg">{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChoose

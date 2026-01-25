'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface Activity {
    id: string
    title: string
    duration: string
    price: number
    images: string | null
    destination: { name: string }
    category: { name: string }
    reviews: { rating: number }[]
}

interface FeaturedActivitiesProps {
    activities: Activity[]
    trendingTitle: string
    trendingSubtitle: string
    viewAllLabel: string
}

const FeaturedActivities = ({
    activities,
    trendingTitle,
    trendingSubtitle,
    viewAllLabel
}: FeaturedActivitiesProps) => {
    const ct = useTranslations('Common');
    const dt = useTranslations('Database');

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            {trendingTitle}
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl font-medium">
                            {trendingSubtitle}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/activities"
                            className="mt-6 md:mt-0 flex items-center text-indigo-600 font-bold hover:text-indigo-700 group text-lg"
                        >
                            {viewAllLabel}
                            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {activities.map((activity) => {
                        const images = JSON.parse(activity.images || '[]')
                        return (
                            <motion.div
                                key={activity.id}
                                variants={item}
                                className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        src={images[0] || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'}
                                        alt={activity.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest border border-white/20">
                                            {activity.category.name}
                                        </span>
                                    </div>
                                    <button className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-900 hover:bg-indigo-600 hover:text-white transition-all shadow-lg">
                                        <ArrowRight size={20} />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                                        <MapPin size={14} className="mr-2 text-indigo-500" />
                                        {dt(activity.destination.name)}
                                        <span className="mx-3 text-slate-200">|</span>
                                        <Star size={14} className="mr-2 text-amber-400 fill-amber-400" />
                                        {activity.reviews.length > 0
                                            ? `${(activity.reviews.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / activity.reviews.length).toFixed(1)} (${activity.reviews.length} ${ct('reviews')})`
                                            : ct('new')}
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                                        <Link href={`/activities/${activity.id}`}>
                                            {dt(activity.title)}
                                        </Link>
                                    </h3>

                                    <div className="flex items-center text-slate-500 text-sm font-medium mb-8">
                                        <Clock size={16} className="mr-2 text-slate-300" />
                                        {activity.duration}
                                    </div>

                                    <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{ct('from')}</p>
                                            <p className="text-3xl font-black text-slate-900 tracking-tight">{formatPrice(activity.price)}</p>
                                        </div>
                                        <Link
                                            href={`/activities/${activity.id}`}
                                            className="px-8 py-3 bg-slate-900 text-white text-sm font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
                                        >
                                            {ct('bookNow')}
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}

export default FeaturedActivities

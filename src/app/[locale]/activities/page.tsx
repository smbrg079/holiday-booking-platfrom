import React from 'react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { Search, SlidersHorizontal, MapPin, Clock, Star, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Find Adventures & Activities | HolidaySync',
    description: 'Browse through hundreds of unique holiday activities and tours around the world.',
}

import { getTranslations } from 'next-intl/server'
import SearchInput from '@/components/activities/SearchInput'
import PriceFilter from '@/components/activities/PriceFilter'

interface PageProps {
    searchParams: Promise<{
        destination?: string
        category?: string
        q?: string
        maxPrice?: string
    }>
}

const ActivitiesPage = async ({ searchParams }: PageProps) => {
    const { destination, category, q, maxPrice } = await searchParams
    const t = await getTranslations('Activities')
    const ct = await getTranslations('Common')
    const dt = await getTranslations('Database')

    const activities = await prisma.activity.findMany({
        where: {
            ...(destination && { destination: { name: destination } }),
            ...(category && { category: { name: category } }),
            ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
            ...(q && {
                OR: [
                    { title: { contains: q } },
                    { description: { contains: q } },
                ],
            }),
        },
        include: {
            destination: true,
            category: true,
            reviews: { select: { rating: true } }
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    const categories = await prisma.category.findMany()
    const destinations = await prisma.destination.findMany()

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2">{t('title')}</h1>
                        <p className="text-slate-500 font-medium">{t('found', { count: activities.length })}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <SearchInput />
                        <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors hidden md:flex">
                            <SlidersHorizontal size={18} className="text-indigo-600" />
                            <span className="font-bold text-slate-700">{t('filters')}</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-64 shrink-0 space-y-10 hidden lg:block">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">{t('categories')}</h3>
                            <div className="space-y-4">
                                {categories.map((cat: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                                    <Link
                                        key={cat.id}
                                        href={`/activities?category=${cat.name}${destination ? `&destination=${destination}` : ''}${q ? `&q=${q}` : ''}${maxPrice ? `&maxPrice=${maxPrice}` : ''}`}
                                        className={`block font-medium hover:text-indigo-600 transition-colors ${category === cat.name ? 'text-indigo-600' : 'text-slate-500'}`}
                                    >
                                        {dt(cat.name)}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">{t('destinations')}</h3>
                            <div className="space-y-4">
                                {destinations.map((dest: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                                    <Link
                                        key={dest.id}
                                        href={`/activities?destination=${dest.name}${category ? `&category=${category}` : ''}${q ? `&q=${q}` : ''}${maxPrice ? `&maxPrice=${maxPrice}` : ''}`}
                                        className={`block font-medium hover:text-indigo-600 transition-colors ${destination === dest.name ? 'text-indigo-600' : 'text-slate-500'}`}
                                    >
                                        {dt(dest.name)}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <PriceFilter />
                    </aside>

                    {/* Activities Grid */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {activities.map((activity: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                            const images = JSON.parse(activity.images || '[]')
                            return (
                                <div
                                    key={activity.id}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={images[0] || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'}
                                            alt={activity.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-xs font-bold text-slate-900 border border-white/20">
                                                {dt(activity.category.name)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-3">
                                            <MapPin size={12} className="mr-1 text-indigo-500" />
                                            {dt(activity.destination.name)}
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                            <Link href={`/activities/${activity.id}`}>
                                                {dt(activity.title)}
                                            </Link>
                                        </h3>

                                        <div className="flex items-center text-slate-500 text-sm mb-6">
                                            <Clock size={16} className="mr-1" />
                                            {activity.duration}
                                            <span className="mx-2 text-slate-200">|</span>
                                            <Star size={14} className="mr-1 text-amber-400 fill-amber-400" />
                                            {activity.reviews.length > 0
                                                ? (activity.reviews.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / activity.reviews.length).toFixed(1)
                                                : ct('new')}
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{ct('price')}</p>
                                                <p className="text-2xl font-black text-slate-900">{formatPrice(activity.price)}</p>
                                            </div>
                                            <Link
                                                href={`/activities/${activity.id}`}
                                                className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors shadow-lg"
                                            >
                                                <ArrowRight size={20} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        {activities.length === 0 && (
                            <div className="col-span-full py-24 text-center bg-white rounded-3xl border border-slate-100">
                                <Search size={48} className="mx-auto text-slate-200 mb-4" />
                                <h3 className="text-xl font-bold text-slate-900">{t('noFound')}</h3>
                                <p className="text-slate-500">{t('adjustFilters')}</p>
                                <Link href="/activities" className="mt-6 inline-block text-indigo-600 font-bold underline underline-offset-4">
                                    {t('clearFilters')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivitiesPage

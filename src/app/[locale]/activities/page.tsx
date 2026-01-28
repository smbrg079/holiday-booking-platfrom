import React from 'react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { Search, SlidersHorizontal, MapPin, Clock, Star, ArrowRight, Compass } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import SearchInput from '@/components/activities/SearchInput'
import PriceFilter from '@/components/activities/PriceFilter'

export const metadata: Metadata = {
    title: 'Find Adventures & Activities | HolidaySync',
    description: 'Browse through hundreds of unique holiday activities and tours around the world.',
}

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
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-600 text-xs font-black uppercase tracking-widest mb-4">
                        <Compass size={14} />
                        Explore The World
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">{t('title')}</h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl">
                        Discover {activities.length} unique experiences tailored to your adventurous spirit. From local secrets to world-class tours.
                    </p>
                </div>

                {/* Filters & Search Header */}
                <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-md py-4 mb-12 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <SearchInput />
                    <div className="flex items-center gap-3">
                        <button className="flex items-center space-x-2 px-6 py-4 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                            <SlidersHorizontal size={18} />
                            <span className="font-black text-sm">{t('filters')}</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-72 shrink-0 space-y-12 block">
                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                            <div className="mb-10">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-6">{t('categories')}</h3>
                                <div className="space-y-3">
                                    {categories.map((cat: any) => (
                                        <Link
                                            key={cat.id}
                                            href={`/activities?category=${cat.name}${destination ? `&destination=${destination}` : ''}${q ? `&q=${q}` : ''}${maxPrice ? `&maxPrice=${maxPrice}` : ''}`}
                                            className={`block py-2 px-4 rounded-xl font-bold text-sm transition-all ${category === cat.name ? 'bg-white text-indigo-600 shadow-md translate-x-1' : 'text-slate-500 hover:text-indigo-600 hover:translate-x-1'}`}
                                        >
                                            {dt(cat.name)}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-6">{t('destinations')}</h3>
                                <div className="space-y-3">
                                    {destinations.map((dest: any) => (
                                        <Link
                                            key={dest.id}
                                            href={`/activities?destination=${dest.name}${category ? `&category=${category}` : ''}${q ? `&q=${q}` : ''}${maxPrice ? `&maxPrice=${maxPrice}` : ''}`}
                                            className={`block py-2 px-4 rounded-xl font-bold text-sm transition-all ${destination === dest.name ? 'bg-white text-indigo-600 shadow-md translate-x-1' : 'text-slate-500 hover:text-indigo-600 hover:translate-x-1'}`}
                                        >
                                            {dt(dest.name)}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <PriceFilter />
                        </div>
                    </aside>

                    {/* Activities Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {activities.map((activity: any) => {
                                const images = JSON.parse(activity.images || '[]')
                                const rating = activity.reviews.length > 0
                                    ? (activity.reviews.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / activity.reviews.length).toFixed(1)
                                    : null;

                                return (
                                    <div
                                        key={activity.id}
                                        className="group bg-white rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 border border-slate-100 flex flex-col h-full"
                                    >
                                        <div className="relative h-72 overflow-hidden">
                                            <Image
                                                src={images[0] || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'}
                                                alt={activity.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest border border-white/20">
                                                    {dt(activity.category.name)}
                                                </span>
                                            </div>
                                            <Link
                                                href={`/activities/${activity.id}`}
                                                className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg"
                                            >
                                                <ArrowRight size={20} />
                                            </Link>
                                        </div>

                                        <div className="p-8 flex-1 flex flex-col">
                                            <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                                                <MapPin size={14} className="mr-2 text-indigo-500" />
                                                {dt(activity.destination.name)}
                                                <span className="mx-3 text-slate-200">|</span>
                                                <Star size={14} className="mr-2 text-amber-400 fill-amber-400" />
                                                {rating ? `${rating} (${activity.reviews.length})` : ct('new')}
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
                                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{ct('price')}</p>
                                                    <p className="text-3xl font-black text-slate-900 tracking-tight">{formatPrice(activity.price)}</p>
                                                </div>
                                                <Link
                                                    href={`/activities/${activity.id}`}
                                                    className="px-8 py-3 bg-slate-900 text-white text-sm font-black rounded-2xl group-hover:bg-indigo-600 transition-all shadow-lg"
                                                >
                                                    {ct('bookNow')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {activities.length === 0 && (
                            <div className="py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                                <Search size={64} className="mx-auto text-slate-200 mb-6" />
                                <h3 className="text-2xl font-black text-slate-900 mb-2">{t('noFound')}</h3>
                                <p className="text-slate-500 font-medium">{t('adjustFilters')}</p>
                                <Link href="/activities" className="mt-8 inline-flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-sm hover:gap-3 transition-all">
                                    {t('clearFilters')} <ArrowRight size={16} />
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

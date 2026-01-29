import React from 'react'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { Metadata } from 'next'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { Clock, MapPin, Check, X, Star, Info } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import BookingSidebar from '@/components/activities/BookingSidebar'
import ReviewForm from '@/components/activities/ReviewForm'
import { getTranslations } from 'next-intl/server'

interface PageProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const activity = await prisma.activity.findUnique({
        where: { id },
        include: { destination: true }
    })

    if (!activity) {
        return {
            title: 'Activity Not Found | HolidaySync',
        }
    }

    return {
        title: `${activity.title} in ${activity.destination.name} | HolidaySync`,
        description: activity.description.substring(0, 160),
        openGraph: {
            images: JSON.parse(activity.images || '[]')[0] || [],
        },
    }
}

const ActivityDetailsPage = async ({ params }: PageProps) => {
    const { id } = await params
    const t = await getTranslations('ActivityDetails')
    const ct = await getTranslations('Common')
    const dt = await getTranslations('Database')


    const activity = await prisma.activity.findUnique({
        where: { id },
        include: {
            destination: true,
            category: true,
            slots: {
                where: {
                    startTime: {
                        gte: new Date(),
                    },
                },
                orderBy: {
                    startTime: 'asc',
                },
            },
            reviews: {
                include: {
                    user: true,
                },
            },
        },
    })

    if (!activity) {
        notFound()
    }

    const images = JSON.parse(activity.images || '[]')
    const itinerary = JSON.parse(activity.itinerary || '[]')
    const included = JSON.parse(activity.included || '[]')
    const excluded = JSON.parse(activity.excluded || '[]')

    return (
        <div className="bg-white min-h-screen">
            {/* Immersive Hero Header */}
            <div className="relative h-[60vh] min-h-[500px] w-full flex items-end">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={images[0] || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'}
                        alt={activity.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
                    <div className="flex flex-wrap items-center gap-3 text-white/80 font-bold text-xs uppercase tracking-widest mb-4">
                        <Link href="/" className="hover:text-white transition-colors">{t('home')}</Link>
                        <span>/</span>
                        <Link href="/activities" className="hover:text-white transition-colors">{t('activities')}</Link>
                        <span>/</span>
                        <span className="text-white">{dt(activity.destination.name)}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight max-w-4xl">
                        {dt(activity.title)}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-white text-sm md:text-base font-bold">
                        <div className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                            <Star size={18} className="text-amber-400 fill-amber-400 mr-2" />
                            <span>4.9</span>
                            <span className="mx-2 opacity-50">|</span>
                            <span className="text-white/80">{activity.reviews.length} {ct('reviews')}</span>
                        </div>
                        <div className="flex items-center px-4 py-2 bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/20">
                            <MapPin size={18} className="mr-2" />
                            {dt(activity.destination.name)}
                        </div>
                        <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                            <Clock size={18} className="mr-2" />
                            {activity.duration}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="bg-slate-50 border-b border-slate-100 mb-16">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-8">
                    <div className="flex items-center space-x-12">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('pricingFrom')}</span>
                            <span className="text-2xl font-black text-slate-900">{formatPrice(activity.price)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{ct('duration')}</span>
                            <span className="text-lg font-bold text-slate-700">{activity.duration}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('availability')}</span>
                            <span className="text-lg font-bold text-emerald-500">{t('availableToday')}</span>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-6 py-3 border-2 border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-white hover:border-indigo-600 hover:text-indigo-600 transition-all">
                            {t('saveToWishlist')}
                        </button>
                        <button className="px-10 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                            {t('shareTour')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px]">
                    {images.slice(0, 4).map((img: string, i: number) => (
                        <div key={i} className={`relative rounded-[2.5rem] overflow-hidden group shadow-lg ${i === 0 ? 'md:col-span-2' : ''}`}>
                            <Image
                                src={img}
                                alt={`Activity View ${i}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                    {images.length < 4 && Array.from({ length: 4 - images.length }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-slate-50 rounded-[2.5rem] flex items-center justify-center border-2 border-dashed border-slate-200">
                            <Info className="text-slate-200" size={32} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content & Booking Sidebar */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Left Column */}
                <div className="lg:col-span-2">
                    {/* Description */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold mb-6 flex items-center">
                            <Info className="mr-2 text-indigo-600" />
                            {t('overview')}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {dt(activity.title + '_desc')}
                        </p>
                    </div>

                    <hr className="border-slate-100 mb-12" />

                    {/* Itinerary */}
                    {itinerary.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold mb-8">{t('whatToExpect')}</h3>
                            <div className="space-y-6">
                                {itinerary.map((step: string, i: number) => (
                                    <div key={i} className="flex space-x-6">
                                        <div className="flex flex-col items-center">
                                            <div className="w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-indigo-100" />
                                            {i !== itinerary.length - 1 && <div className="w-[2px] h-full bg-slate-100 my-2" />}
                                        </div>
                                        <p className="text-slate-600 font-medium pb-2">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <hr className="border-slate-100 mb-12" />

                    {/* Included / Excluded */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        <div>
                            <h3 className="text-xl font-bold mb-6">{t('included')}</h3>
                            <ul className="space-y-4">
                                {included.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start">
                                        <Check className="text-emerald-500 mr-3 mt-1 shrink-0" size={18} />
                                        <span className="text-slate-600">{dt(item)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-6">{t('excluded')}</h3>
                            <ul className="space-y-4">
                                {excluded.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start">
                                        <X className="text-rose-500 mr-3 mt-1 shrink-0" size={18} />
                                        <span className="text-slate-600">{dt(item)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <hr className="border-slate-100 mb-12" />

                    {/* Reviews Section */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold mb-8 flex items-center justify-between">
                            <span>{ct('reviews')} ({activity.reviews.length})</span>
                            <div className="flex items-center text-lg">
                                <Star size={20} className="text-amber-400 fill-amber-400 mr-1" />
                                <span>{activity.reviews.length > 0 ? (activity.reviews.reduce((acc, r) => acc + r.rating, 0) / activity.reviews.length).toFixed(1) : ct('new')}</span>
                            </div>
                        </h3>

                        <div className="space-y-8 mb-16">
                            {activity.reviews.map((review: { id: string; rating: number; comment: string | null; createdAt: Date | string; user: { name: string | null } | null }) => (
                                <div key={review.id} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-indigo-600 shadow-sm border border-slate-100">
                                                {review.user?.name?.[0].toUpperCase() || 'U'}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{review.user?.name || t('traveler')}</div>
                                                <div className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div className="flex text-amber-400">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} size={14} className={i < review.rating ? 'fill-amber-400' : 'text-slate-200'} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed italic">&ldquo;{review.comment}&rdquo;</p>
                                </div>
                            ))}
                            {activity.reviews.length === 0 && <p className="text-slate-400 text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">{t('noReviews')}</p>}
                        </div>

                        {/* Review Form Integration */}
                        <ReviewForm activityId={activity.id} />
                    </div>
                </div>

                {/* Right Column / Booking Card */}
                <div>
                    <BookingSidebar
                        activityId={activity.id}
                        price={activity.price}
                        slots={activity.slots}
                    />
                </div>
            </div>
        </div>
    )
}

export default ActivityDetailsPage

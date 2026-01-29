import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { richDestinationData } from '@/data/destinations'
import { MapPin, Clock, Star, ArrowRight, Sparkles, Info } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { formatPrice } from '@/lib/utils'

interface PageProps {
    params: Promise<{
        slug: string
        locale: string
    }>
}

const DestinationDetailPage = async ({ params }: PageProps) => {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)
    const t = await getTranslations('Homepage')
    const dt = await getTranslations('Database')
    const ct = await getTranslations('Common')


    const destination = await prisma.destination.findFirst({
        where: {
            name: {
                equals: decodedSlug,
            }
        },
        include: {
            activities: {
                include: {
                    category: true,
                    reviews: { select: { rating: true } }
                }
            }
        }
    })

    if (!destination) {
        notFound()
    }

    const richData = richDestinationData[destination.name]

    return (
        <div className="bg-white min-h-screen">
            {/* Immersive Hero Section */}
            <div className="relative h-[70vh] w-full min-h-[600px] flex items-center justify-center overflow-hidden">
                <Image
                    src={destination.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'}
                    alt={destination.name}
                    fill
                    className="object-cover scale-105"
                    priority
                />
                {/* Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-white" />

                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-bold mb-8 border border-white/20">
                        <MapPin size={16} className="text-indigo-400" />
                        <span className="uppercase tracking-widest">{t('destinationsTitle')}</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl">
                        {dt(destination.name)}
                    </h1>
                    <p className="text-xl md:text-2xl text-white font-medium max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
                        {destination.description}
                    </p>
                </div>

                {/* Bottom decorative curve / element */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-16">
                {/* Highlights Bar */}
                {richData && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
                        {richData.highlights.map((highlight, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Sparkles size={20} />
                                </div>
                                <span className="font-bold text-slate-700">{highlight}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Main Content Area */}
                {richData && (
                    <div className="space-y-32 mb-32">
                        {/* About Section */}
                        <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10 max-w-4xl">
                                <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">
                                    About {dt(destination.name)}
                                </h2>
                                <p className="text-slate-600 text-xl leading-relaxed font-medium">
                                    {richData.longDescription}
                                </p>
                            </div>
                        </div>

                        {/* Rich Content Sections */}
                        {richData.sections.map((section, idx) => (
                            <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-24 items-center`}>
                                <div className="flex-1 w-full">
                                    <div className="relative h-[400px] md:h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group">
                                        <Image
                                            src={section.image || destination.image || ''}
                                            alt={section.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                                        {section.title}
                                    </h3>
                                    <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                                        {section.content}
                                    </p>
                                    <button className="mt-10 flex items-center gap-3 text-indigo-600 font-black uppercase tracking-widest text-sm hover:gap-5 transition-all">
                                        Learn More <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Experiences / Activities Grid */}
                <div className="pb-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 px-4">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Experiences in {dt(destination.name)}
                            </h2>
                            <p className="text-slate-500 text-lg font-medium">
                                Discover hand-picked adventures and unique activities curated by local experts in {dt(destination.name)}.
                            </p>
                        </div>
                    </div>

                    {destination.activities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {destination.activities.map((activity) => {
                                let images = []
                                try {
                                    images = JSON.parse(activity.images || '[]')
                                } catch {
                                    images = []
                                }
                                const mainImage = images[0] || destination.image || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'
                                const rating = activity.reviews.length > 0
                                    ? (activity.reviews.reduce((acc, r) => acc + r.rating, 0) / activity.reviews.length).toFixed(1)
                                    : null;

                                return (
                                    <Link key={activity.id} href={`/activities/${activity.id}`} className="group h-full">
                                        <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col h-full">
                                            {/* Image Container */}
                                            <div className="relative h-72 overflow-hidden">
                                                <Image
                                                    src={mainImage}
                                                    alt={activity.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute top-6 left-6">
                                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest border border-white/20">
                                                        {activity.category.name}
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
                                                    <ArrowRight size={20} />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-8 flex flex-col flex-1">
                                                <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                                                    <Star size={14} className="mr-2 text-amber-400 fill-amber-400" />
                                                    {rating
                                                        ? `${rating} (${activity.reviews.length} ${ct('reviews')})`
                                                        : ct('new')}
                                                    <span className="mx-3 text-slate-200">|</span>
                                                    <Clock size={14} className="mr-2 text-indigo-500" />
                                                    {activity.duration}
                                                </div>

                                                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                                                    {dt(activity.title)}
                                                </h3>

                                                <p className="text-slate-500 line-clamp-2 mb-8 font-medium italic">
                                                    {dt(activity.title + '_desc')}
                                                </p>

                                                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{ct('from')}</p>
                                                        <p className="text-3xl font-black text-slate-900 tracking-tight">{formatPrice(activity.price)}</p>
                                                    </div>
                                                    <div className="px-8 py-3 bg-slate-900 text-white text-sm font-black rounded-2xl group-hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
                                                        {ct('bookNow')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem]">
                            <Info size={48} className="text-slate-300 mx-auto mb-6" />
                            <p className="text-slate-500 text-xl font-bold">No activities available for {dt(destination.name)} yet.</p>
                            <p className="text-slate-400 mt-2">Check back later for curated experiences.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DestinationDetailPage

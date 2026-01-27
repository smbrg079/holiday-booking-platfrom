import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { richDestinationData } from '@/data/destinations'
import { MapPin, Clock, Star } from 'lucide-react'
import { Link } from '@/i18n/routing'

interface PageProps {
    params: Promise<{
        slug: string
        locale: string
    }>
}

const DestinationDetailPage = async ({ params }: PageProps) => {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const destination = await prisma.destination.findFirst({
        where: {
            name: {
                equals: decodedSlug,
            }
            // Note: SQLite might care about case. We try exact match first or handle casing if needed.
            // Our seed matching matches the slug used in URLs hopefully.
        },
        include: {
            activities: {
                include: {
                    category: true
                }
            }
        }
    })

    if (!destination) {
        notFound()
    }

    const richData = richDestinationData[destination.name]

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={destination.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'}
                    alt={destination.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
                            Discover {destination.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md">
                            {destination.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
                {/* Rich Content Sections */}
                {richData && (
                    <div className="grid grid-cols-1 gap-12 mb-20">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">About {destination.name}</h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                {richData.longDescription}
                            </p>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {richData.highlights.map((highlight, idx) => (
                                    <span key={idx} className="bg-sky-50 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold">
                                        ✨ {highlight}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {richData.sections.map((section, idx) => (
                            <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                                <div className="flex-1">
                                    <div className="relative h-[300px] md:h-[400px] w-full rounded-3xl overflow-hidden shadow-lg">
                                        <Image
                                            src={section.image || destination.image || ''}
                                            alt={section.title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{section.title}</h3>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Activities Section */}
                <div className="mb-20">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                            Experiences in {destination.name}
                        </h2>
                        {/* <Link href="/activities" className="text-indigo-600 font-bold hover:underline">
                            View all
                        </Link> */}
                    </div>

                    {destination.activities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {destination.activities.map((activity) => {
                                let images = []
                                try {
                                    images = JSON.parse(activity.images || '[]')
                                } catch (e) {
                                    images = []
                                }
                                const mainImage = images[0] || destination.image

                                return (
                                    <Link key={activity.id} href={`/activities/${activity.id}`} className="group block h-full">
                                        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                                            <div className="relative h-64 overflow-hidden">
                                                <Image
                                                    src={mainImage}
                                                    alt={activity.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-900">
                                                    {activity.category.name}
                                                </div>
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <div className="flex items-center space-x-2 text-slate-500 text-sm mb-3">
                                                    <Clock size={16} />
                                                    <span>{activity.duration}</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                                    {activity.title}
                                                </h3>
                                                <p className="text-slate-500 line-clamp-2 mb-4 flex-1">
                                                    {activity.description}
                                                </p>
                                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                                                    <div className="flex items-center text-amber-400 text-sm font-bold">
                                                        <Star size={16} className="fill-current mr-1" />
                                                        4.8 (12)
                                                    </div>
                                                    <div className="text-lg font-black text-indigo-600">
                                                        ${activity.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl">
                            <p className="text-slate-500 text-lg">No activities available specifically for {destination.name} yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DestinationDetailPage

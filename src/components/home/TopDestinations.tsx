import React from 'react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { ArrowRight, MapPin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

const TopDestinations = async () => {
    const t = await getTranslations('Homepage');
    const dt = await getTranslations('Database');
    const destinations = await prisma.destination.findMany({
        take: 4,
        include: {
            _count: {
                select: { activities: true }
            }
        }
    })

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                            {t('destinationsTitle')}
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl">
                            {t('destinationsSubtitle')}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((destination, index) => (
                        <Link
                            key={destination.id}
                            href={`/destinations/${encodeURIComponent(destination.name)}`}
                            className={`group relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-xl shadow-slate-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${index % 4 === 1 || index % 4 === 2 ? 'lg:translate-y-8' : ''
                                }`}
                        >
                            <div className="aspect-[4/5] relative">
                                <Image
                                    src={destination.image || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'}
                                    alt={destination.name}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                                    <div className="flex items-center space-x-2 text-indigo-400 mb-2">
                                        <MapPin size={16} />
                                        <span className="text-xs font-black uppercase tracking-widest leading-none">
                                            {destination._count.activities} {t('experiences')}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black mb-2 group-hover:translate-x-2 transition-transform duration-500">
                                        {dt(destination.name)}
                                    </h3>
                                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                        <span className="text-sm font-bold mr-2 text-white/80">{t('exploreNow')}</span>
                                        <ArrowRight size={16} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TopDestinations

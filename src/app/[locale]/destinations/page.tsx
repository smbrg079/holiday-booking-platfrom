import React from 'react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { MapPin, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Explore Destinations | HolidaySync',
    description: 'Discover world-class destinations and unique travel experiences with HolidaySync.',
}

const DestinationsPage = async () => {
    const destinations = await prisma.destination.findMany({
        include: {
            _count: {
                select: { activities: true }
            }
        }
    })

    return (
        <div className="pt-32 pb-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Explore Destinations</h1>
                    <p className="text-slate-500 text-lg max-w-2xl">
                        From tropical paradises to bustling metropolitan hubs, discover the perfect place for your next getaway.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {destinations.map((dest) => (
                        <Link
                            key={dest.id}
                            href={`/activities?destination=${dest.name}`}
                            className="group relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                        >
                            <Image
                                src={dest.image || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'}
                                alt={dest.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-widest mb-2">
                                    <MapPin size={14} />
                                    <span>{dest._count.activities} Activities available</span>
                                </div>
                                <h3 className="text-3xl font-bold mb-4">{dest.name}</h3>
                                <p className="text-white/70 line-clamp-2 mb-6 group-hover:text-white transition-colors">
                                    {dest.description}
                                </p>
                                <div className="flex items-center font-bold text-sm tracking-wide group-hover:translate-x-2 transition-transform">
                                    Browse Activities
                                    <ArrowRight size={16} className="ml-2" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DestinationsPage

import React from 'react'
import { Link } from '@/i18n/routing'
import { redirect } from "next/navigation"
import prisma from '@/lib/prisma'
import { Calendar, MapPin, Clock, CreditCard, ChevronRight, ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

const UserDashboard = async () => {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect('/api/auth/signin')
    }

    const bookings = await prisma.booking.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            activity: {
                include: { destination: true }
            },
            slot: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-2">My Bookings</h1>
                    <p className="text-slate-500 font-medium">Manage your upcoming adventures and view past trips.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Bookings List */}
                    <div className="lg:col-span-2 space-y-6">
                        {bookings.map((booking: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                            const images = JSON.parse(booking.activity.images || '[]')
                            const isUpcoming = new Date(booking.slot.startTime) > new Date()

                            return (
                                <div key={booking.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col md:flex-row gap-8">
                                    <div className="w-full md:w-48 h-48 relative rounded-2xl overflow-hidden shrink-0">
                                        <Image src={images[0] || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'} alt={booking.activity.title} fill className="object-cover" />
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isUpcoming ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                                {isUpcoming ? 'Upcoming' : 'Past'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center text-indigo-600 text-xs font-bold uppercase tracking-widest mb-1">
                                                    <MapPin size={12} className="mr-1" />
                                                    {booking.activity.destination.name}
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-2">{booking.activity.title}</h3>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-slate-900">{formatPrice(booking.totalPrice)}</p>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{booking.participants} persons</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center text-slate-500 bg-slate-50 px-4 py-2 rounded-xl text-sm">
                                                <Calendar size={16} className="mr-2 text-indigo-500" />
                                                {new Date(booking.slot.startTime).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center text-slate-500 bg-slate-50 px-4 py-2 rounded-xl text-sm">
                                                <Clock size={16} className="mr-2 text-indigo-500" />
                                                {new Date(booking.slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>

                                        <div className="flex space-x-3">
                                            <button className="flex-1 py-3 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm">
                                                Download Ticket
                                            </button>
                                            <button className="px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors text-sm">
                                                Manage
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        {bookings.length === 0 && (
                            <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                                <Calendar size={48} className="mx-auto text-slate-200 mb-4" />
                                <h3 className="text-xl font-bold text-slate-900">No bookings yet</h3>
                                <p className="text-slate-500 mb-8 text-lg">You haven&apos;t booked any adventures yet. Start exploring now!</p>
                                <Link href="/activities" className="px-10 py-5 bg-indigo-600 text-white font-bold rounded-full hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100">
                                    Explore Activities
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-8">
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl">
                            <div className="flex items-center space-x-6 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-2xl text-white">
                                    {session.user.name?.[0].toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold truncate max-w-[150px]">{session.user.name}</h3>
                                    <p className="text-white/50 text-xs truncate max-w-[150px]">{session.user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-8 border-t border-white/10">
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                                    <span className="font-bold flex items-center">
                                        <CreditCard size={18} className="mr-3 text-indigo-400" />
                                        Payment Methods
                                    </span>
                                    <ChevronRight size={18} className="text-white/20 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                                    <span className="font-bold flex items-center">
                                        <ShoppingBag size={18} className="mr-3 text-indigo-400" />
                                        Reward Points
                                    </span>
                                    <span className="text-indigo-400 font-black">1,450 pts</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-lg">
                            <h3 className="text-lg font-black mb-6">Need Help?</h3>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                If you have questions about your bookings or need to reschedule, our support team is available 24/7.
                            </p>
                            <button className="w-full py-4 border-2 border-indigo-600 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-colors">
                                Chat with Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard

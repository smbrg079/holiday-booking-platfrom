import React from 'react'
import prisma from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import BookingStatusToggle from '@/components/admin/BookingStatusToggle'
import { Calendar, User } from 'lucide-react'

export default async function AdminBookingsPage() {
    const bookings = await prisma.booking.findMany({
        include: {
            activity: { include: { destination: true } },
            user: true,
            slot: true
        },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div>
            <h1 className="text-3xl font-black text-slate-900 mb-8">Booking Management</h1>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                                <th className="px-8 py-5">Reference</th>
                                <th className="px-8 py-5">Guest</th>
                                <th className="px-8 py-5">Activity & Date</th>
                                <th className="px-8 py-5">Amount</th>
                                <th className="px-8 py-5">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-6 font-mono font-bold text-indigo-600">
                                        {booking.bookingReference}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{booking.user.name}</div>
                                                <div className="text-xs text-slate-400">{booking.user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-slate-600">
                                        <div className="font-bold text-slate-900 mb-1">{booking.activity.title}</div>
                                        <div className="flex items-center text-slate-400">
                                            <Calendar size={12} className="mr-1" />
                                            {new Date(booking.slot.startTime).toLocaleDateString()} at {new Date(booking.slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-black text-slate-900">
                                        {formatPrice(booking.totalPrice)}
                                    </td>
                                    <td className="px-8 py-6">
                                        <BookingStatusToggle id={booking.id} status={booking.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {bookings.length === 0 && (
                    <div className="p-12 text-center text-slate-500 font-medium">
                        No bookings yet. They will appear here once guests start booking!
                    </div>
                )}
            </div>
        </div>
    )
}

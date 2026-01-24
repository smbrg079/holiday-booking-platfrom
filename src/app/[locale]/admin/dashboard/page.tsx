import React from 'react'
import prisma from '@/lib/prisma'
import {
    Users,
    ShoppingBag,
    TrendingUp,
    DollarSign,
    Calendar,
    MoreVertical,
    CheckCircle2,
    Clock,
    XCircle
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import BookingStatusToggle from '@/components/admin/BookingStatusToggle'

const AdminDashboard = async () => {
    const [bookings, stats] = await Promise.all([
        prisma.booking.findMany({
            include: {
                activity: true,
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
        }),
        prisma.booking.aggregate({
            _sum: {
                totalPrice: true,
            },
            _count: {
                id: true,
            }
        })
    ])

    const totalRevenue = stats._sum.totalPrice || 0
    const totalBookings = stats._count.id || 0

    const statCards = [
        { name: 'Total Revenue', value: formatPrice(totalRevenue), icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { name: 'Total Bookings', value: totalBookings.toString(), icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { name: 'Active Users', value: '1,284', icon: Users, color: 'text-cyan-600', bg: 'bg-cyan-50' },
        { name: 'Conversion Rate', value: '2.4%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
    ]

    return (
        <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Admin Dashboard</h1>
                        <p className="text-slate-500 font-medium">Welcome back, Administrator</p>
                    </div>
                    <button className="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
                        Export Reports
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statCards.map((card) => (
                        <div key={card.name} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-6">
                            <div className={`${card.bg} ${card.color} w-14 h-14 rounded-2xl flex items-center justify-center`}>
                                <card.icon size={28} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{card.name}</p>
                                <p className="text-2xl font-black text-slate-900">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Bookings Table */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-xl font-bold">Recent Bookings</h3>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 px-4 py-2 bg-slate-50 rounded-lg text-xs font-bold text-slate-500">
                                <Calendar size={14} />
                                <span>Last 30 Days</span>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                    <th className="px-8 py-4">Booking Ref</th>
                                    <th className="px-8 py-4">Activity</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4">Amount</th>
                                    <th className="px-8 py-4">Date</th>
                                    <th className="px-8 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {bookings.map((booking: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <span className="font-mono font-bold text-indigo-600">{booking.bookingReference}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-slate-900">{booking.activity.title}</div>
                                            <div className="text-xs text-slate-400">{booking.participants} participants</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <BookingStatusToggle id={booking.id} status={booking.status} />
                                        </td>
                                        <td className="px-8 py-6 font-black text-slate-900">
                                            {formatPrice(booking.totalPrice)}
                                        </td>
                                        <td className="px-8 py-6 text-slate-500 text-sm">
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                                <MoreVertical size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 border-t border-slate-100 bg-slate-50/30 text-center">
                        <button className="text-indigo-600 font-bold hover:underline">View All Bookings</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard

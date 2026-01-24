import React from 'react'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Trash2, Edit, MapPin, Tag } from 'lucide-react'
import { deleteActivity } from '@/app/actions/admin'
import { formatPrice } from '@/lib/utils'

export default async function AdminActivitiesPage() {
    const activities = await prisma.activity.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            destination: true,
            category: true,
            _count: { select: { bookings: true } }
        }
    })

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black text-slate-900">Activities</h1>
                <Link
                    href="/admin/activities/new"
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-lg shadow-indigo-200"
                >
                    <Plus size={20} />
                    <span>Add Activity</span>
                </Link>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                                <th className="px-8 py-5">Activity</th>
                                <th className="px-8 py-5">Destination</th>
                                <th className="px-8 py-5">Price</th>
                                <th className="px-8 py-5">Bookings</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {activities.map((activity) => {
                                const images = JSON.parse(activity.images || '[]')
                                return (
                                    <tr key={activity.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden relative shrink-0">
                                                    {images[0] && (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={images[0]} alt={activity.title} className="object-cover w-full h-full" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{activity.title}</div>
                                                    <div className="flex items-center text-xs text-slate-400 mt-1">
                                                        <Tag size={12} className="mr-1" />
                                                        {activity.category.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center text-slate-600 font-medium">
                                                <MapPin size={14} className="mr-2 text-indigo-500" />
                                                {activity.destination.name}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-black text-slate-900">{formatPrice(activity.price)}</td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
                                                {activity._count.bookings} Bookings
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                                    <Edit size={18} />
                                                </button>
                                                <form action={async () => {
                                                    'use server'
                                                    await deleteActivity(activity.id)
                                                }}>
                                                    <button type="submit" className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {activities.length === 0 && (
                    <div className="p-12 text-center text-slate-500 font-medium">
                        No activities found. Start by creating your first experience!
                    </div>
                )}
            </div>
        </div>
    )
}

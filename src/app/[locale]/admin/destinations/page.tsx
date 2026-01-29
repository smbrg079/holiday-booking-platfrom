import React from 'react'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { Link } from '@/i18n/routing'
import { Plus, Trash2, Edit } from 'lucide-react'
import { deleteDestination } from '@/app/actions/admin'

// Small Client Component for Delete Button to handle pending state if I were meticulous
// But for now, I'll allow Server Action to be called directly from a form.

export default async function AdminDestinationsPage() {
    const destinations = await prisma.destination.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { activities: true } } }
    })

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black text-slate-900">Destinations</h1>
                <Link
                    href="/admin/destinations/new"
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-lg shadow-indigo-200"
                >
                    <Plus size={20} />
                    <span>Add Destination</span>
                </Link>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                        <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                            <th className="px-8 py-5">Name</th>
                            <th className="px-8 py-5">Description</th>
                            <th className="px-8 py-5">Activities</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {destinations.map((destination) => (
                            <tr key={destination.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-6 font-bold text-slate-900">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden relative">
                                            {destination.image && <Image src={destination.image} alt={destination.name} fill className="object-cover" />}
                                        </div>
                                        <span>{destination.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-slate-500 max-w-xs truncate">{destination.description}</td>
                                <td className="px-8 py-6 text-indigo-600 font-bold">{destination._count.activities}</td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                            <Edit size={18} />
                                        </button>
                                        <form action={async () => {
                                            'use server'
                                            await deleteDestination(destination.id)
                                        }}>
                                            <button type="submit" className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {destinations.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        No destinations found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    )
}

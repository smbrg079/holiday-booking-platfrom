'use client'

import React from 'react'
import { createDestination } from '@/app/actions/admin'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, UploadCloud } from 'lucide-react'
import Link from 'next/link'

export default function NewDestinationPage() {
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        const result = await createDestination(formData)
        if (result?.error) {
            alert(result.error)
        } else {
            router.push('/admin/destinations')
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link href="/admin/destinations" className="inline-flex items-center text-slate-400 hover:text-slate-900 transition-colors mb-4 text-sm font-bold">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Destinations
                </Link>
                <h1 className="text-3xl font-black text-slate-900">Add New Destination</h1>
            </div>

            <form action={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Name</label>
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Paris, France"
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        placeholder="Brief description of the destination..."
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-600"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Cover Image URL</label>
                    <div className="flex space-x-4">
                        <div className="flex-1 relative">
                            <input
                                name="image"
                                type="url"
                                placeholder="https://..."
                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-600"
                            />
                            <UploadCloud className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">For now, paste a valid image URL from Unsplash or similar.</p>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-lg shadow-indigo-200 flex items-center space-x-2"
                    >
                        <Save size={20} />
                        <span>Save Destination</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

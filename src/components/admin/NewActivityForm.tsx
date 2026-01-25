'use client'

import React, { useState } from 'react'
import { createActivity } from '@/app/actions/admin'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, UploadCloud, Info, DollarSign, Clock, Map, Tag } from 'lucide-react'
import Link from 'next/link'

interface Props {
    destinations: { id: string, name: string }[]
    categories: { id: string, name: string }[]
}

export default function NewActivityForm({ destinations, categories }: Props) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        const result = await createActivity(formData)
        setIsSubmitting(false)

        if (result?.error) {
            alert(result.error)
        } else {
            router.push('/admin/activities')
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <Link href="/admin/activities" className="inline-flex items-center text-slate-400 hover:text-slate-900 transition-colors mb-4 text-sm font-bold">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Activities
                </Link>
                <h1 className="text-3xl font-black text-slate-900">Create New Experience</h1>
            </div>

            <form action={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
                    <h2 className="text-xl font-bold flex items-center text-slate-900">
                        <Info className="mr-3 text-indigo-600" size={20} />
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Title</label>
                            <input
                                name="title"
                                type="text"
                                required
                                placeholder="e.g. Tropical Rainforest Trek"
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Price</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    required
                                    placeholder="0.00"
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Duration</label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    name="duration"
                                    type="text"
                                    required
                                    placeholder="e.g. 4 hours"
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Destination</label>
                            <div className="relative">
                                <Map className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <select
                                    name="destinationId"
                                    required
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-900 appearance-none"
                                >
                                    <option value="">Select Destination</option>
                                    {destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                            <div className="relative">
                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <select
                                    name="categoryId"
                                    required
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-900 appearance-none"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            required
                            placeholder="Describe the activity experience..."
                            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-600"
                        ></textarea>
                    </div>
                </div>

                {/* Additional Details */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
                    <h2 className="text-xl font-bold flex items-center text-slate-900">
                        <UploadCloud className="mr-3 text-indigo-600" size={20} />
                        Assets & Extras
                    </h2>

                    <div>
                        <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Image URLs (JSON Array)</label>
                        <textarea
                            name="images"
                            placeholder='["https://...", "https://..."]'
                            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-600 font-mono"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">What&apos;s Included (JSON)</label>
                            <textarea
                                name="included"
                                placeholder='["Guide", "Lunch"]'
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-600 font-mono"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">What&apos;s Excluded (JSON)</label>
                            <textarea
                                name="excluded"
                                placeholder='["Tips", "Insurance"]'
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-600 font-mono"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-12 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 flex items-center space-x-3 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <span>Creating...</span>
                        ) : (
                            <>
                                <Save size={20} />
                                <span>Save Experience</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

'use client'

import { useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { useTransition, useState, useEffect } from 'react'
import { Search } from 'lucide-react'

export default function SearchInput() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [query, setQuery] = useState(searchParams.get('q') || '')

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams)
            if (query) {
                params.set('q', query)
            } else {
                params.delete('q')
            }

            startTransition(() => {
                router.push(`/activities?${params.toString()}`)
            })
        }, 300)

        return () => clearTimeout(timer)
    }, [query, router, searchParams])

    return (
        <div className={`relative group ${isPending ? 'opacity-50' : ''}`}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search activities..."
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 w-[240px] md:w-[320px] transition-all outline-none font-medium"
            />
        </div>
    )
}

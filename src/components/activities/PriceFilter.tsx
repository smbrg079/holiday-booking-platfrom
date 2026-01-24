'use client'

import { useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { formatPrice } from '@/lib/utils'

export default function PriceFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [price, setPrice] = useState(searchParams.get('maxPrice') || '1000')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPrice(value)

        const params = new URLSearchParams(searchParams)
        if (value === '1000') {
            params.delete('maxPrice')
        } else {
            params.set('maxPrice', value)
        }

        startTransition(() => {
            router.push(`/activities?${params.toString()}`)
        })
    }

    return (
        <div className={isPending ? 'opacity-50' : ''}>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Max Price</h3>
            <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={price}
                onChange={handleChange}
                className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs font-bold text-slate-400 mt-4 bg-slate-100 p-2 rounded-lg">
                <span>$10</span>
                <span className="text-indigo-600 font-black">{formatPrice(parseInt(price))}</span>
                <span>$1000+</span>
            </div>
        </div>
    )
}

'use client'

import { useState } from 'react'
import { Calendar, Users, ShieldCheck, Loader2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useRouter } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'

interface Slot {
    id: string
    startTime: Date | string
    capacity: number
    booked: number
}

interface BookingSidebarProps {
    activityId: string
    price: number
    slots: Slot[]
}

export default function BookingSidebar({ activityId, price, slots }: BookingSidebarProps) {
    const t = useTranslations('Booking')
    const locale = useLocale()
    const router = useRouter()
    const [selectedSlot, setSelectedSlot] = useState(slots[0]?.id || '')
    const [participants, setParticipants] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const totalPrice = price * participants

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedSlot) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    activityId,
                    slotId: selectedSlot,
                    participants,
                }),
            })

            const data = await response.json()

            if (data.redirectUrl) {
                router.push(data.redirectUrl)
            } else if (data.error) {
                alert(data.error)
            }
        } catch {
            alert(t('failed'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="sticky top-28 p-8 border border-slate-100 rounded-[2.5rem] bg-white shadow-2xl shadow-indigo-500/5">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">{t('pricePerPerson')}</p>
                    <p className="text-4xl font-black text-slate-900">{formatPrice(price)}</p>
                </div>
                <div className="text-right">
                    <p className="text-emerald-500 font-bold text-sm">{t('bestPrice')}</p>
                </div>
            </div>

            <form onSubmit={handleBooking} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">{t('selectDate')}</label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium appearance-none"
                            required
                        >
                            {slots.map((slot) => (
                                <option key={slot.id} value={slot.id}>
                                    {new Date(slot.startTime).toLocaleDateString(locale, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </option>
                            ))}
                            {slots.length === 0 && <option disabled>{t('noSlots')}</option>}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">{t('participants')}</label>
                    <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="number"
                            min="1"
                            value={participants}
                            onChange={(e) => setParticipants(parseInt(e.target.value) || 1)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
                            required
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2 text-sm text-slate-500">
                        <span>{formatPrice(price)} x {participants} {t('participants').toLowerCase()}</span>
                        <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-slate-900 font-bold">{t('grandTotal')}</span>
                        <span className="text-3xl font-black text-indigo-600">{formatPrice(totalPrice)}</span>
                    </div>

                    <button
                        type="submit"
                        disabled={slots.length === 0 || isSubmitting}
                        className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 disabled:bg-slate-200 disabled:shadow-none flex items-center justify-center space-x-3"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>{t('submitting')}</span>
                            </>
                        ) : (
                            <>
                                <span>{t('bookNow')}</span>
                                <ShieldCheck size={20} />
                            </>
                        )}
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4 font-medium">{t('freeCancellation')}</p>
                </div>
            </form>
        </div>
    )
}

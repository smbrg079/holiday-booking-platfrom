import React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Lock, MapPin } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import PaymentWrapper from '@/components/checkout/PaymentWrapper'

interface PageProps {
    params: Promise<{ id: string, locale: string }>
}

const CheckoutPage = async ({ params }: PageProps) => {
    const { id, locale } = await params

    const booking = await prisma.booking.findUnique({
        where: { id },
        include: {
            activity: {
                include: { destination: true }
            },
            slot: true
        }
    })

    if (!booking) {
        notFound()
    }

    const images = JSON.parse(booking.activity.images || '[]')

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column: Payment Details */}
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-8 flex items-center">
                            <Lock className="mr-3 text-indigo-600" size={28} />
                            Secure Checkout
                        </h1>

                        <PaymentWrapper bookingId={booking.id} amount={booking.totalPrice} locale={locale} />
                    </div>

                    {/* Right Column: Order Summary */}
                    <div>
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-28 shadow-2xl">
                            <h3 className="text-2xl font-bold mb-8">Booking Summary</h3>

                            <div className="flex space-x-6 mb-8">
                                <div className="w-24 h-24 relative rounded-2xl overflow-hidden shrink-0">
                                    <Image
                                        src={images[0] || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'}
                                        alt={booking.activity.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1 leading-tight">{booking.activity.title}</h4>
                                    <div className="flex items-center text-slate-400 text-sm">
                                        <MapPin size={12} className="mr-1" />
                                        {booking.activity.destination.name}
                                    </div>
                                    <div className="mt-2 inline-block px-2 py-1 bg-white/10 rounded text-[10px] font-bold uppercase tracking-widest">
                                        Reference: {booking.bookingReference}
                                    </div>
                                </div>
                            </div>

                            <hr className="border-white/10 mb-8" />

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-slate-400">
                                    <span>Date</span>
                                    <span className="text-white font-medium">
                                        {new Date(booking.slot.startTime).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400">
                                    <span>Time</span>
                                    <span className="text-white font-medium">
                                        {new Date(booking.slot.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400">
                                    <span>Quantity</span>
                                    <span className="text-white font-medium">{booking.participants} persons</span>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-400">Subtotal</span>
                                    <span>{formatPrice(booking.totalPrice)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-slate-400">Booking Fee</span>
                                    <span className="text-emerald-400 font-bold underline underline-offset-4 cursor-help">FREE</span>
                                </div>

                                <div className="flex justify-between items-end">
                                    <span className="text-slate-400 text-sm pb-1 uppercase font-black tracking-widest">Grand Total</span>
                                    <span className="text-4xl font-black text-white">{formatPrice(booking.totalPrice)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage

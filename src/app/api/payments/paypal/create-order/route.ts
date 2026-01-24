import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createPaypalOrder } from '@/lib/paypal'

export async function POST(req: Request) {
    try {
        const { bookingId } = await req.json()

        if (!bookingId) {
            return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 })
        }

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
        })

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
        }

        const order = await createPaypalOrder(booking.totalPrice, booking.bookingReference)

        return NextResponse.json({ id: order.id })

    } catch (error) {
        console.error('PayPal Order Error:', error)
        return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 })
    }
}

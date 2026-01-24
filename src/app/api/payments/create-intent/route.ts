import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const { bookingId } = await req.json()

        if (!bookingId) {
            return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 })
        }

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { activity: true }
        })

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
        }

        if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === '') {
            console.error('STRIPE_SECRET_KEY is missing in environmental variables.')
            return NextResponse.json({
                error: 'Stripe is not configured. Please add your STRIPE_SECRET_KEY to the .env file.'
            }, { status: 500 })
        }

        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(booking.totalPrice * 100), // Stripe expects cents
            currency: 'usd',
            metadata: {
                bookingId: booking.id,
                bookingReference: booking.bookingReference,
            },
            automatic_payment_methods: {
                enabled: true,
            },
        })

        // Create or update payment record with the new payment intent ID
        await prisma.payment.upsert({
            where: { bookingId: booking.id },
            update: {
                stripeId: paymentIntent.id,
                amount: booking.totalPrice,
                status: 'PENDING',
            },
            create: {
                bookingId: booking.id,
                stripeId: paymentIntent.id,
                amount: booking.totalPrice,
                status: 'PENDING',
            }
        })

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        })

    } catch (error) {
        console.error('Stripe Payment Intent Error:', error)
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

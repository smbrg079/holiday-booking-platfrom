import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import { sendBookingConfirmation } from '@/lib/mail'
import { rateLimitMiddleware } from '@/lib/rate-limit-middleware'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
    const rateLimitResponse = await rateLimitMiddleware.webhook(req)
    if (rateLimitResponse) {
        return rateLimitResponse
    }

    const body = await req.text()
    const sig = (await headers()).get('stripe-signature') as string

    let event

    try {
        if (!sig || !webhookSecret) {
            return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 })
        }
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        console.error(`Webhook signature verification failed: ${message}`)
        return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object
            const bookingId = paymentIntent.metadata.bookingId

            if (bookingId) {
                // Update payment and booking status
                await prisma.$transaction([
                    prisma.payment.update({
                        where: { stripeId: paymentIntent.id },
                        data: { status: 'SUCCEEDED' },
                    }),
                    prisma.booking.update({
                        where: { id: bookingId },
                        data: { status: 'CONFIRMED' },
                    }),
                ])
                console.log(`Payment for booking ${bookingId} succeeded.`)

                // Send confirmation email
                const booking = await prisma.booking.findUnique({
                    where: { id: bookingId },
                    include: { user: true, activity: true, slot: true }
                })

                if (booking && booking.user.email) {
                    await sendBookingConfirmation(
                        booking.user.email,
                        booking.bookingReference,
                        booking.activity.title,
                        booking.totalPrice,
                        booking.slot.startTime
                    )
                }
            }
            break

        case 'payment_intent.payment_failed':
            const failedIntent = event.data.object
            await prisma.payment.update({
                where: { stripeId: failedIntent.id },
                data: { status: 'FAILED' },
            })
            console.log(`Payment failed for intent ${failedIntent.id}`)
            break

        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
}

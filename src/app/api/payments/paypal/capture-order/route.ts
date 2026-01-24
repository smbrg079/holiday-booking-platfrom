import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { capturePaypalOrder } from '@/lib/paypal'

export async function POST(req: Request) {
    try {
        const { orderID, bookingId } = await req.json()

        if (!orderID || !bookingId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const captureData = await capturePaypalOrder(orderID)

        if (captureData.status === 'COMPLETED') {
            // Update booking and create payment record
            await prisma.$transaction([
                prisma.booking.update({
                    where: { id: bookingId },
                    data: { status: 'CONFIRMED' }
                }),
                prisma.payment.upsert({
                    where: { bookingId: bookingId },
                    update: {
                        stripeId: `paypal_${orderID}`,
                        amount: parseFloat(captureData.purchase_units[0].payments.captures[0].amount.value),
                        status: 'SUCCEEDED'
                    },
                    create: {
                        bookingId: bookingId,
                        stripeId: `paypal_${orderID}`,
                        amount: parseFloat(captureData.purchase_units[0].payments.captures[0].amount.value),
                        status: 'SUCCEEDED'
                    }
                })
            ])

            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ success: false, status: captureData.status })

    } catch (error) {
        console.error('PayPal Capture Error:', error)
        return NextResponse.json({ error: 'Failed to capture PayPal payment' }, { status: 500 })
    }
}

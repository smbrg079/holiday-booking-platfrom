import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"


export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        const body = await req.json()
        const { activityId, slotId, participants } = body

        // Use session userId if available, otherwise fallback to seed anonymous user
        const finalUserId = session?.user?.id || 'anonymous'

        if (!activityId || !slotId || !participants) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // 1. Fetch activity and slot
        const [activity, slot] = await Promise.all([
            prisma.activity.findUnique({ where: { id: activityId } }),
            prisma.availabilitySlot.findUnique({ where: { id: slotId } })
        ])

        if (!activity || !slot) {
            return NextResponse.json({ error: 'Activity or Slot not found' }, { status: 404 })
        }

        // 2. Check for availability
        if (slot.booked + participants > slot.capacity) {
            return NextResponse.json({ error: 'Not enough capacity available' }, { status: 400 })
        }

        // 3. Generate booking reference
        const bookingReference = `HS-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`

        // 4. Create booking in PENDING status
        const booking = await prisma.booking.create({
            data: {
                userId: finalUserId,
                activityId,
                slotId,
                participants: parseInt(participants),
                totalPrice: activity.price * parseInt(participants),
                bookingReference,
                status: 'PENDING',
            }
        })

        // 5. Update slot booked count
        await prisma.availabilitySlot.update({
            where: { id: slotId },
            data: { booked: { increment: parseInt(participants) } }
        })

        // 6. In a real app, we would create a Stripe Payment Intent here
        // const paymentIntent = await stripe.paymentIntents.create({ ... })

        return NextResponse.json({
            success: true,
            booking,
            redirectUrl: `/checkout/${booking.id}`
        })

    } catch (error) {
        console.error('Booking Error:', error)
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }
}

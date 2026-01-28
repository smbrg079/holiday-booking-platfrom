import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { rateLimitMiddleware } from '@/lib/rate-limit-middleware'
import { schemas, validateRequest } from '@/lib/validation'
import { requireAuth } from '@/lib/auth-guards'


export async function POST(req: NextRequest) {
    const rateLimitResponse = await rateLimitMiddleware.booking(req)
    if (rateLimitResponse) {
        return rateLimitResponse
    }

    const authResponse = await requireAuth(req)
    if (authResponse) {
        return authResponse
    }

    try {
        const session = await getServerSession(authOptions)
        const body = await req.json()

        // Validate input
        const validation = validateRequest(schemas.booking.create, body)
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            )
        }
        const { activityId, slotId, participants } = validation.data!

        // Use session userId if available, otherwise fallback to seed anonymous user
        const finalUserId = session?.user?.id || 'anonymous'

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
                participants,
                totalPrice: activity.price * participants,
                bookingReference,
                status: 'PENDING',
            }
        })

        // 5. Update slot booked count
        await prisma.availabilitySlot.update({
            where: { id: slotId },
            data: { booked: { increment: participants } }
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

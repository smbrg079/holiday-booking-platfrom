import prisma from '@/lib/prisma'
import type { Booking } from '@prisma/client'

export interface CreateBookingInput {
  activityId: string
  slotId: string
  participants: number
  userId: string
}

export type CreateBookingResult =
  | { success: true; booking: Booking; redirectUrl: string }
  | { success: false; error: string; status: number; code: 'NOT_FOUND' | 'CONFLICT' }

/**
 * Creates a booking and updates slot capacity.
 * Reusable from API routes or server actions; does not perform auth or validation.
 */
export async function createBooking(
  input: CreateBookingInput
): Promise<CreateBookingResult> {
  const { activityId, slotId, participants, userId } = input

  const [activity, slot] = await Promise.all([
    prisma.activity.findUnique({ where: { id: activityId } }),
    prisma.availabilitySlot.findUnique({ where: { id: slotId } }),
  ])

  if (!activity || !slot) {
    return {
      success: false,
      error: 'Activity or Slot not found',
      status: 404,
      code: 'NOT_FOUND',
    }
  }

  if (slot.booked + participants > slot.capacity) {
    return {
      success: false,
      error: 'Not enough capacity available',
      status: 400,
      code: 'CONFLICT',
    }
  }

  const bookingReference = `HS-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`

  const booking = await prisma.booking.create({
    data: {
      userId,
      activityId,
      slotId,
      participants,
      totalPrice: activity.price * participants,
      bookingReference,
      status: 'PENDING',
    },
  })

  await prisma.availabilitySlot.update({
    where: { id: slotId },
    data: { booked: { increment: participants } },
  })

  return {
    success: true,
    booking,
    redirectUrl: `/checkout/${booking.id}`,
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { rateLimitMiddleware } from '@/lib/rate-limit-middleware'
import { schemas, validateRequest } from '@/lib/validation'
import { requireAuth } from '@/lib/auth-guards'
import { apiError } from '@/lib/errors'
import { logger } from '@/lib/logger'
import { createBooking } from '@/lib/services/booking'

export async function POST(req: NextRequest) {
  const rateLimitResponse = await rateLimitMiddleware.booking(req)
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  const authResponse = await requireAuth()
  if (authResponse) {
    return authResponse
  }

  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()

    const validation = validateRequest(schemas.booking.create, body)
    if (!validation.success) {
      return apiError(validation.error ?? 'Invalid input', 400, 'VALIDATION_ERROR')
    }
    const { activityId, slotId, participants } = validation.data!

    const userId = session?.user?.id ?? 'anonymous'

    const result = await createBooking({
      activityId,
      slotId,
      participants,
      userId,
    })

    if (!result.success) {
      return apiError(result.error, result.status, result.code)
    }

    return NextResponse.json({
      success: true,
      booking: result.booking,
      redirectUrl: result.redirectUrl,
    })
  } catch (error) {
    logger.error('Failed to create booking', error)
    return apiError('Failed to create booking', 500, 'INTERNAL_ERROR')
  }
}

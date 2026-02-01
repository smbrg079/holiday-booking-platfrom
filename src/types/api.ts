import type { Booking } from '@prisma/client'

/** Standard success response for booking creation */
export interface BookingCreateSuccess {
  success: true
  booking: Booking
  redirectUrl: string
}

/** Consistent API error body (matches lib/errors.ts) */
export interface ApiErrorBody {
  error: string
  code?: string
}

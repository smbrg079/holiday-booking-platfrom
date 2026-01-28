import { z } from 'zod'

export const schemas = {
  auth: {
    register: z.object({
      name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .regex(/^[a-zA-Z\s-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
      email: z.string()
        .email('Invalid email address')
        .max(255, 'Email must be less than 255 characters'),
      password: z.string()
        .min(12, 'Password must be at least 12 characters')
        .max(128, 'Password must be less than 128 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    }),
    
    login: z.object({
      email: z.string()
        .email('Invalid email address')
        .max(255, 'Email must be less than 255 characters'),
      password: z.string()
        .min(1, 'Password is required')
        .max(128, 'Password must be less than 128 characters'),
    }),
  },

  booking: {
    create: z.object({
      activityId: z.string()
        .uuid('Invalid activity ID'),
      slotId: z.string()
        .uuid('Invalid slot ID'),
      participants: z.number()
        .int('Participants must be an integer')
        .min(1, 'At least 1 participant is required')
        .max(20, 'Maximum 20 participants allowed'),
    }),
  },

  newsletter: {
    subscribe: z.object({
      email: z.string()
        .email('Invalid email address')
        .max(255, 'Email must be less than 255 characters'),
    }),
  },

  payment: {
    createIntent: z.object({
      bookingId: z.string()
        .uuid('Invalid booking ID'),
    }),
  },

  paypal: {
    createOrder: z.object({
      bookingId: z.string()
        .uuid('Invalid booking ID'),
    }),
    
    captureOrder: z.object({
      orderID: z.string()
        .min(1, 'Order ID is required'),
    }),
  },
}

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean
  data?: T
  error?: string
} {
  const result = schema.safeParse(data)
  
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || 'Invalid input',
    }
  }
  
  return {
    success: true,
    data: result.data,
  }
}
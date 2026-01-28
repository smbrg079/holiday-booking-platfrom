import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from './rate-limit'

export function createRateLimitMiddleware(type: keyof typeof import('./rate-limit').rateLimits) {
  return async (request: NextRequest) => {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    const identifier = `${type}:${ip}`
    const result = await checkRateLimit(identifier, type)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { 
          status: 429,
          headers: result.headers,
        }
      )
    }
    
    return null
  }
}

export const rateLimitMiddleware = {
  auth: createRateLimitMiddleware('auth'),
  api: createRateLimitMiddleware('api'),
  booking: createRateLimitMiddleware('booking'),
  newsletter: createRateLimitMiddleware('newsletter'),
  webhook: createRateLimitMiddleware('webhook'),
}
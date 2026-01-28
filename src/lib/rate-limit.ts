import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const rateLimits = {
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    analytics: true,
  }),
  
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '60 s'),
    analytics: true,
  }),
  
  booking: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '60 s'),
    analytics: true,
  }),
  
  newsletter: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '300 s'),
    analytics: true,
  }),
  
  webhook: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1000, '60 s'),
    analytics: true,
  }),
}

export async function checkRateLimit(
  identifier: string,
  type: keyof typeof rateLimits
) {
  const { success, limit, remaining, reset } = await rateLimits[type].limit(identifier)
  
  return {
    success,
    limit,
    remaining,
    reset,
    headers: {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': new Date(reset).toISOString(),
    },
  }
}
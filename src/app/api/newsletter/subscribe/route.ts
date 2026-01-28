import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { rateLimitMiddleware } from '@/lib/rate-limit-middleware'
import { schemas, validateRequest } from '@/lib/validation'

export async function POST(req: NextRequest) {
    const rateLimitResponse = await rateLimitMiddleware.newsletter(req)
    if (rateLimitResponse) {
        return rateLimitResponse
    }

    try {
        const body = await req.json()

        const validation = validateRequest(schemas.newsletter.subscribe, body)
        if (!validation.success) {
            return NextResponse.json({ error: validation.error }, { status: 400 })
        }

        const { email } = validation.data!

        const existingSubscriber = await (prisma as any).subscriber.findUnique({ // eslint-disable-line @typescript-eslint/no-explicit-any
            where: { email },
        })

        if (existingSubscriber) {
            return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })
        }

        await (prisma as any).subscriber.create({ // eslint-disable-line @typescript-eslint/no-explicit-any
            data: { email },
        })

        return NextResponse.json({ message: 'Successfully subscribed' }, { status: 201 })
    } catch (error) {
        console.error('Newsletter Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

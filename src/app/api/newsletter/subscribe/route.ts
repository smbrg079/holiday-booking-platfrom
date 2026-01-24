import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const emailSchema = z.object({
    email: z.string().email(),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const result = emailSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
        }

        const { email } = result.data

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

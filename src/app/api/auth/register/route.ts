import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { rateLimitMiddleware } from '@/lib/rate-limit-middleware'
import { schemas, validateRequest } from '@/lib/validation'

export async function POST(request: NextRequest) {
    const rateLimitResponse = await rateLimitMiddleware.auth(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    try {
        const body = await request.json()

        // Validate input
        const validation = validateRequest(schemas.auth.register, body)
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            )
        }
        const validatedData = validation.data!

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(validatedData.password, 12)

        // Create user
        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
                emailVerified: new Date(), // Auto-verify for demo purposes
            },
        })

        // Return success (without password)
        return NextResponse.json(
            {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                message: 'User created successfully',
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'An error occurred during registration' },
            { status: 500 }
        )
    }
}
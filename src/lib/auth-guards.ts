import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function requireAuth(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
  
  return null
}

export async function requireRole(request: NextRequest, role: string) {
  const authResponse = await requireAuth(request)
  if (authResponse) return authResponse
  
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.role || session.user.role !== role) {
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 }
    )
  }
  
  return null
}

export function getAuthenticatedUser() {
  return getServerSession(authOptions)
}
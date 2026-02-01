import { NextResponse } from 'next/server'

export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR'

/** Consistent shape for API error responses */
export interface ApiErrorBody {
  error: string
  code?: ApiErrorCode
}

/**
 * Returns a NextResponse with a consistent error body.
 * Use in API routes so clients always get { error, code? }.
 */
export function apiError(
  message: string,
  status: number = 500,
  code?: ApiErrorCode
): NextResponse<ApiErrorBody> {
  const body: ApiErrorBody = { error: message }
  if (code) body.code = code
  return NextResponse.json(body, { status })
}

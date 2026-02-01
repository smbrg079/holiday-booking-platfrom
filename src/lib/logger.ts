const isDev = process.env.NODE_ENV !== 'production'

/**
 * Simple logger. In production you can swap this for Pino/winston.
 * Only logs stack in development to avoid leaking internals.
 */
export const logger = {
  error(message: string, err?: unknown) {
    if (isDev && err instanceof Error) {
      console.error(`[ERROR] ${message}`, err.message, err.stack)
    } else {
      console.error(`[ERROR] ${message}`, err instanceof Error ? err.message : err)
    }
  },
  warn(message: string, meta?: Record<string, unknown>) {
    console.warn('[WARN]', message, meta ?? '')
  },
  info(message: string, meta?: Record<string, unknown>) {
    if (isDev) console.info('[INFO]', message, meta ?? '')
  },
}

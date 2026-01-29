import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    // Static routes (always available)
    const routes = ['', '/activities', '/destinations', '/about', '/contact', '/faq', '/terms'].map(
        (route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
        })
    )

    // Try to get dynamic routes from database, but don't fail build if DB is unavailable
    let activityEntries: MetadataRoute.Sitemap = []

    try {
        // Only import prisma if DATABASE_URL is available
        if (process.env.DATABASE_URL) {
            const prisma = (await import('@/lib/prisma')).default
            const activities = await prisma.activity.findMany({
                select: { id: true, updatedAt: true },
            })

            activityEntries = activities.map((activity) => ({
                url: `${baseUrl}/activities/${activity.id}`,
                lastModified: activity.updatedAt,
            }))
        }
    } catch {
        // If database is unavailable during build, just return static routes
        console.warn('Sitemap: Database unavailable, returning static routes only')
    }

    return [...routes, ...activityEntries]
}

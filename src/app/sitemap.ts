import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    // Activities
    const activities = await prisma.activity.findMany({
        select: { id: true, updatedAt: true },
    })

    const activityEntries: MetadataRoute.Sitemap = activities.map((activity) => ({
        url: `${baseUrl}/activities/${activity.id}`,
        lastModified: activity.updatedAt,
    }))

    // Static routes
    const routes = ['', '/activities', '/destinations', '/about', '/contact', '/faq', '/terms'].map(
        (route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
        })
    )

    return [...routes, ...activityEntries]
}

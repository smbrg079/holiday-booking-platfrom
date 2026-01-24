import React from 'react'
import prisma from '@/lib/prisma'
import NewActivityForm from '@/components/admin/NewActivityForm'

export default async function NewActivityPage() {
    const [destinations, categories] = await Promise.all([
        prisma.destination.findMany({ select: { id: true, name: true } }),
        prisma.category.findMany({ select: { id: true, name: true } })
    ])

    return (
        <NewActivityForm
            destinations={destinations}
            categories={categories}
        />
    )
}

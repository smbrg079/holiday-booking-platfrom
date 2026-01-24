/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // Clean up existing data
    await prisma.review.deleteMany()
    await prisma.booking.deleteMany()
    await prisma.availabilitySlot.deleteMany()
    await prisma.activity.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()
    await prisma.destination.deleteMany()

    // Create a default anonymous user for guest bookings
    await prisma.user.create({
        data: {
            id: 'anonymous',
            name: 'Guest User',
            email: 'guest@holidaysync.com',
            role: 'USER'
        }
    })

    // Create a default admin user
    await prisma.user.create({
        data: {
            id: 'admin',
            name: 'Admin User',
            email: 'admin@holidaysync.com',
            role: 'ADMIN'
        }
    })

    // Create Destinations
    const destinations = await Promise.all([
        prisma.destination.create({
            data: {
                name: 'Bali, Indonesia',
                description: 'Island of the Gods, featuring volcanic mountains, iconic rice paddies, beaches and coral reefs.',
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
            },
        }),
        prisma.destination.create({
            data: {
                name: 'Santorini, Greece',
                description: 'Famous for its dramatic views, stunning sunsets from Oia town, the strange white aubergine (eggplant), and its very own active volcano.',
                image: 'https://images.unsplash.com/photo-1613395877344-13d4c79e4284',
            },
        }),
        prisma.destination.create({
            data: {
                name: 'Kyoto, Japan',
                description: 'Famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses.',
                image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
            },
        }),
        prisma.destination.create({
            data: {
                name: 'Marrakech, Morocco',
                description: 'A major city of the Kingdom of Morocco. It is the fourth largest city in the country, after Casablanca, Fez and Tangier.',
                image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b',
            },
        }),
    ])

    // Create Categories
    const categories = await Promise.all([
        prisma.category.create({ data: { name: 'Adventure' } }),
        prisma.category.create({ data: { name: 'Cultural' } }),
        prisma.category.create({ data: { name: 'Relaxation' } }),
        prisma.category.create({ data: { name: 'Culinary' } }),
    ])

    // Create Activities
    // Bali - Adventure
    await prisma.activity.create({
        data: {
            title: 'Mount Batur Sunrise Trek',
            description: 'Hike up the sacred Mount Batur and watch the sunrise over the caldera lake. This active volcano offers stunning views and a memorable adventure.',
            duration: '6 hours',
            price: 55.0,
            destinationId: destinations[0].id,
            categoryId: categories[0].id,
            images: JSON.stringify(['https://images.unsplash.com/photo-1537996194471-e657df975ab4']),
            included: JSON.stringify(['Hotel pickup', 'Breakfast', 'Guide']),
            excluded: JSON.stringify(['Lunch', 'Tips']),
            slots: {
                create: [
                    { startTime: new Date('2026-06-01T02:00:00Z'), endTime: new Date('2026-06-01T08:00:00Z'), capacity: 10 },
                    { startTime: new Date('2026-06-02T02:00:00Z'), endTime: new Date('2026-06-02T08:00:00Z'), capacity: 10 },
                ]
            }
        },
    })

    // Santorini - Relaxation
    await prisma.activity.create({
        data: {
            title: 'Luxury Catamaran Cruise',
            description: 'Sail around Santorini in style. Visit the Red and White beaches, swim in the hot springs, and enjoy a delicious BBQ on board.',
            duration: '5 hours',
            price: 120.0,
            destinationId: destinations[1].id,
            categoryId: categories[2].id,
            images: JSON.stringify(['https://images.unsplash.com/photo-1613395877344-13d4c79e4284']),
            included: JSON.stringify(['Transfer', 'Meal', 'Drinks', 'Snorkeling gear']),
            excluded: JSON.stringify(['Towels']),
            slots: {
                create: [
                    { startTime: new Date('2026-06-01T10:00:00Z'), endTime: new Date('2026-06-01T15:00:00Z'), capacity: 15 },
                ]
            }
        },
    })

    // Kyoto - Cultural
    await prisma.activity.create({
        data: {
            title: 'Traditional Tea Ceremony',
            description: 'Experience the art of the Japanese tea ceremony in a historic teahouse. Learn about matcha, zen, and the etiquette of this ancient ritual.',
            duration: '2 hours',
            price: 45.0,
            destinationId: destinations[2].id,
            categoryId: categories[1].id,
            images: JSON.stringify(['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e']),
            included: JSON.stringify(['Kimono rental', 'Tea', 'Sweets']),
            excluded: JSON.stringify([]),
            slots: {
                create: [
                    { startTime: new Date('2026-06-01T14:00:00Z'), endTime: new Date('2026-06-01T16:00:00Z'), capacity: 6 },
                ]
            }
        },
    })

    // Marrakech - Culinary
    await prisma.activity.create({
        data: {
            title: 'Moroccan Cooking Class',
            description: 'Visit a local market to buy fresh ingredients, then learn to cook a traditional Tagine and Couscous with a local chef.',
            duration: '4 hours',
            price: 65.0,
            destinationId: destinations[3].id,
            categoryId: categories[3].id,
            images: JSON.stringify(['https://images.unsplash.com/photo-1597212618440-806262de4f6b']),
            included: JSON.stringify(['Market tour', 'Cooking class', 'Lunch']),
            excluded: JSON.stringify(['Drinks']),
            slots: {
                create: [
                    { startTime: new Date('2026-06-01T09:00:00Z'), endTime: new Date('2026-06-01T13:00:00Z'), capacity: 8 },
                ]
            }
        },
    })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

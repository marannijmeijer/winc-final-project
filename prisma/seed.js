import { PrismaClient } from '@prisma/client'
import userData from '../data/users.json' assert { type: 'json' }
import bookingData from '../data/bookings.json' assert { type: 'json' }
import reviewData from '../data/reviews.json' assert { type: 'json' }
import propertyData from '../data/properties.json' assert { type: 'json' }
import hostData from '../data/hosts.json' assert { type: 'json' }
import amenityData from '../data/amenities.json' assert { type: 'json' }


const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

async function main() {
    const { users } = userData
    const { reviews } = reviewData
    const { properties } = propertyData
    const { hosts } = hostData
    const { amenities } = amenityData
    const { bookings } = bookingData


    for (const user of users) {
        await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: user
        })
    }
    for (const host of hosts) {
        await prisma.host.upsert({
            where: { id: host.id },
            update: {},
            create: host
        })
    }
    for (const property of properties) {
        await prisma.property.upsert({
            where: { id: property.id },
            update: {},
            create: {
                id: property.id,
                title: property.title,
                description: property.description,
                location: property.location,
                pricePerNight: property.pricePerNight,
                bedroomCount: property.bedroomCount,
                bathRoomCount: property.bathRoomCount,
                maxGuestCount: property.maxGuestCount,
                rating: property.rating,
                host: {
                    connect: { id: property.hostId }
                }
            }
        })
    }
    for (const review of reviews) {
        await prisma.review.upsert({
            where: { id: review.id },
            update: {},
            create: {
                id: review.id,
                userId: review.userId,
                rating: review.rating,
                comment: review.comment,
                property: {
                    connect: { id: review.propertyId },
                }
            }
        });
    }
    for (const amenity of amenities) {
        await prisma.amenity.upsert({
            where: { id: amenity.id },
            update: {},
            create: amenity
        })
    }
    for (const booking of bookings) {
        await prisma.booking.upsert({
            where: { id: booking.id },
            update: {},
            create: {
                id: booking.id,
                userId: booking.userId,
                checkinDate: booking.checkinDate,
                checkoutDate: booking.checkoutDate,
                numberOfGuests: booking.numberOfGuests,
                totalPrice: booking.totalPrice,
                bookingStatus: booking.bookingStatus,
                property: {
                    connect: { id: booking.propertyId },
                }
            }
        });
    }
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
import { PrismaClient } from '@prisma/client'

const createProperty = async (title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating) => {
    const prisma = new PrismaClient()

    if (title === undefined || description === undefined || location === undefined || pricePerNight === undefined || bedroomCount === undefined || bathRoomCount === undefined || maxGuestCount === undefined || hostId === undefined || rating === undefined) {
        return
    }

    return prisma.property.create({
        data: {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            hostId,
            rating
        }
    })
}

export default createProperty
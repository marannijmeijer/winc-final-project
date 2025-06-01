import { PrismaClient } from '@prisma/client'

const updatePropertyById = async (id, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating) => {
    const prisma = new PrismaClient()

    const updatedProperty = await prisma.property.updateMany({
        where: {
            id
        },
        data: {
            title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating
        }
    })

    if (!updatedProperty || updatedProperty.count === 0) {
        throw new Error(`Property with id ${id} was not found!`)
    }

    return {
        message: `Prperty with id ${id} was updated!`
    }
}

export default updatePropertyById
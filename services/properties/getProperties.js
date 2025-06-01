import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight, amenities) => {
    const prisma = new PrismaClient()

    prisma.location = location ?? prisma.location
    prisma.pricePerNight = parseFloat(pricePerNight) ?? prisma.pricePerNight
    prisma.amenities = amenities ?? prisma.amenities

    return await prisma.property.findMany({
        where: {
            location,
            pricePerNight,
            amenities
        }
    })
}


export default getProperties
import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight, amenities) => {
    const prisma = new PrismaClient()

    const propertyValues = {
        location,
        amenities
    }
    if (pricePerNight) {
        propertyValues.pricePerNight = parseFloat(pricePerNight)
    }

    return await prisma.property.findMany({
        where: propertyValues
    })
}


export default getProperties
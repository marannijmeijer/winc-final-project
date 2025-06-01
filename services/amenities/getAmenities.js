import { PrismaClient } from '@prisma/client';

const getAmenities = async () => {
    const prisma = new PrismaClient()

    return prisma.amenity.findMany({
        where: {

        }
    })
}

export default getAmenities;
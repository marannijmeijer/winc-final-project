import { PrismaClient } from '@prisma/client'

const deleteAmenity = async (id) => {
    const prisma = new PrismaClient()

    const deleteAmenity = await prisma.amenity.deleteMany({
        where: {
            id
        }
    })

    if (!deleteAmenity || deleteAmenity.count === 0) {
        return
    }
    return id
}


export default deleteAmenity
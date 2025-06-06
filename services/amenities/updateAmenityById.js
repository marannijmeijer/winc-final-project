import { PrismaClient } from '@prisma/client'

const updateAmenityById = async (id, name) => {
    const prisma = new PrismaClient()

    const updatedAmenity = await prisma.amenity.updateMany({
        where: {
            id
        },
        data: {
            name
        }
    })

    if (!updatedAmenity || updatedAmenity.count === 0) {
        return
    }

    return {
        message: `Amenity with id ${id} was updated!`
    }

}

export default updateAmenityById;
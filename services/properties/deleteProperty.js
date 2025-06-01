import { PrismaClient } from '@prisma/client'

const deleteProperty = async (id) => {
    const prisma = new PrismaClient()

    const deleteProperty = await prisma.property.deleteMany({
        where: {
            id
        }
    })

    if (!deleteProperty || deleteProperty.count === 0) {
        return
    }

    return id;
}

export default deleteProperty
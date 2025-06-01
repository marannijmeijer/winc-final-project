import { PrismaClient } from '@prisma/client'

const deleteHost = async (id) => {
    const prisma = new PrismaClient()

    const deleteHost = await prisma.host.deleteMany({
        where: {
            id
        }
    })

    if (!deleteHost || deleteHost.count === 0) {
        return
    }
    return id;
}

export default deleteHost
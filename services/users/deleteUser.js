import { PrismaClient } from '@prisma/client'

const deleteUser = async (id) => {
    const prisma = new PrismaClient()

    const deleteUser = await prisma.user.deleteMany({
        where: {
            id
        }
    })

    if (!deleteUser || deleteUser.count === 0) {
        return
    }
    return id;
}

export default deleteUser
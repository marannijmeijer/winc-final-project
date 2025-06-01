import { PrismaClient } from '@prisma/client'

const deleteBooking = async (id) => {
    const prisma = new PrismaClient()

    const deleteBooking = await prisma.booking.deleteMany({
        where: {
            id
        }
    })

    if (!deleteBooking || deleteBooking.count === 0) {
        return
    }
    return id;
}

export default deleteBooking
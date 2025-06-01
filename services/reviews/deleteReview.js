import { PrismaClient } from '@prisma/client'

const deleteReview = async (id) => {
    const prisma = new PrismaClient()

    const deleteReview = await prisma.review.deleteMany({
        where: {
            id
        }
    })

    if (!deleteReview || deleteReview.count === 0) {
        return
    }

    return id;
}

export default deleteReview
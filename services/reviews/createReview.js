import { PrismaClient } from '@prisma/client'

const createReview = async (userId, propertyId, rating, comment) => {
    const prisma = new PrismaClient()

    if (userId === undefined || propertyId === undefined || rating === undefined || comment === undefined) {
        return
    }

    return prisma.review.create({
        data: {
            userId,
            propertyId,
            rating,
            comment
        }
    })
}

export default createReview
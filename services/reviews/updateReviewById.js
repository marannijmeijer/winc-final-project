import { PrismaClient } from '@prisma/client'

const updateReviewById = async (id, userId, propertyId, rating, comment) => {
    const prisma = new PrismaClient()

    const updatedReview = await prisma.review.updateMany({
        where: {
            id
        },
        data: {
            userId, propertyId, rating, comment
        }
    })

    if (!updatedReview || updatedReview.count === 0) {
        return
    }

    return {
        message: `Review with id ${id} was updated!`
    }
}

export default updateReviewById
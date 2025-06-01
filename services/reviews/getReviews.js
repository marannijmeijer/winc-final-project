import { PrismaClient } from "@prisma/client";

const getReviews = async () => {
    const prisma = new PrismaClient()

    return prisma.review.findMany({
        where: {

        }
    })
}

export default getReviews
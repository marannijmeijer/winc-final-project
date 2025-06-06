import { PrismaClient } from '@prisma/client'

const createUser = async (username, password, name, email, phoneNumber, profilePicture) => {
    const prisma = new PrismaClient()

    if (username === undefined || password === undefined || name === undefined || email === undefined || phoneNumber === undefined || profilePicture === undefined) {
        return
    }

    return prisma.user.create({
        data: {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture
        }
    })

}

export default createUser
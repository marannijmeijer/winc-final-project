import { PrismaClient } from '@prisma/client';

const createHost = async (username, password, name, email, phoneNumber, profilePicture, aboutMe) => {
    const prisma = new PrismaClient()

    if (username === undefined || password === undefined || name === undefined || email === undefined || phoneNumber === undefined || profilePicture === undefined || aboutMe === undefined) {
        return
    }

    return prisma.host.create({
        data: {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture,
            aboutMe
        }
    })
}

export default createHost
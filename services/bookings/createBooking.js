import { PrismaClient } from '@prisma/client'
import { Undici } from '@sentry/node';

const createBooking = async (userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus) => {
    const prisma = new PrismaClient()

    if (userId === undefined || propertyId === undefined || checkinDate === undefined || checkoutDate === undefined || numberOfGuests === undefined || totalPrice === undefined || bookingStatus === undefined) {
        return
    }

    return prisma.booking.create({
        data: {
            userId,
            propertyId,
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus
        }
    })
};

export default createBooking;
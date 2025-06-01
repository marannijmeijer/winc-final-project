import express from 'express';
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updateProperyById.js";
import deleteProperty from "../services/properties/deleteProperty.js";
import authMiddleware from '../middleware/auth.js';


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { location, pricePerNight, amenity } = req.query
        const properties = await getProperties(location, pricePerNight, amenity)
        res.status(200).json(properties)
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while getting list of properties')
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const property = await getPropertyById(id)

        if (!property) {
            res.status(404).send(`Property with id ${id} was not found.`)
        } else {
            res.status(200).json(property)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while getting property by id.')
    }
})


router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body
        const newProperty = await createProperty(title, description, location, parseFloat(pricePerNight), Number(bedroomCount), Number(bathRoomCount), Number(maxGuestCount), hostId, Number(rating))
        res.status(201).json(newProperty)
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while creating new property.')
    }
})

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body
        const updatedProperty = await updatePropertyById(id, title, description, location, parseFloat(pricePerNight), Number(bedroomCount), Number(bathRoomCount), Number(maxGuestCount), hostId, Number(rating))
        res.status(200).json(updatedProperty)
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while updating property by id.')
    }
})

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const deletedPropertyId = await deleteProperty(id)

        if (!deletedPropertyId) {
            res.status(404).send(`Property with id ${id} was not found.`)
        } else {
            res.status(200).json({ message: `Property with id ${deletedPropertyId} was deleted.` })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while deleting property with id.')
    }
})

export default router;
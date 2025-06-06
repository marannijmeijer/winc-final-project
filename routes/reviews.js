import express from 'express';
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReview from "../services/reviews/deleteReview.js";
import authMiddleware from '../middleware/auth.js';


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const reviews = await getReviews()
        res.status(200).json(reviews)
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while getting list of reviews')
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const review = await getReviewById(id)

        if (!review) {
            res.status(404).send(`Review with id ${id} was not found.`)
        } else {
            res.status(200).json(review)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while getting review by id.')
    }
})

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { userId, propertyId, rating, comment } = req.body
        const newReview = await createReview(userId, propertyId, Number(rating), comment)
        res.status(201).json(newReview)
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while creating new review.')
    }
})

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const { userId, propertyId, rating, comment } = req.body
        const updatedReview = await updateReviewById(id, userId, propertyId, Number(rating), comment)
        if (!updatedReview || updatedReview.count === 0) {
            res.status(404).send(`Review with id ${id} was not found`)
        } else {
            res.status(200).json(updatedReview)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while updating review by id.')
    }
})

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const deletedReviewId = await deleteReview(id)

        if (!deletedReviewId) {
            res.status(404).send(`Review with id ${id} was not found.`)
        } else {
            res.status(200).json({ message: `Review with id ${deletedReviewId} was deleted.` })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while deleting review with id.')
    }
})

export default router;



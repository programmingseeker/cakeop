import express from 'express';
const router = express.Router();
import { getAllReviews, getReview, deleteReview, updateReview, getCakeReviews } from './../controllers/reviewController.js';

router.route('/').get(getAllReviews);

// ID: refers to the id of the cake
// Gets the reviews on a cake
router.route('/cake/:id').get(getCakeReviews);

//ID: refers to the id of the review
router
    .route('/:id')
    .get(getReview)
    .patch(updateReview)
    .delete(deleteReview);

export default router;
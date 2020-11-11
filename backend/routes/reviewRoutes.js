import express from 'express';
const router = express.Router();
import {
	getAllReviews,
	getReview,
	deleteReview,
	updateReview,
	getCakeReviews,
} from '../controllers/reviewController.js';

router.route('/').get(getAllReviews);
router.route('/cake/:id').get(getCakeReviews);
router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

export default router;

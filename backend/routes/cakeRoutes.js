import express from 'express';
const router = express.Router();
import { restrictTo } from '../controllers/authController.js';
import {
	getAllCake,
	getCake,
	createCake,
	updateCake,
	deleteCake,
} from './../controllers/cakeController.js';
import {
	createReview,
	getCakeReviews,
} from './../controllers/reviewController.js';

router.route('/').get(getAllCake).post(restrictTo('admin'), createCake);
router
	.route('/:id')
	.get(getCake)
	.patch(restrictTo('admin'), updateCake)
	.delete(restrictTo('admin'), deleteCake); 
router.route('/:id/review').post(createReview).get(getCakeReviews);

export default router;

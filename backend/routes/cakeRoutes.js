const express = require('express');
const router = express.Router();
const { restrictTo } = require('../controllers/authController');
const {
	getAllCake,
	getCake,
	createCake,
	updateCake,
	deleteCake,
} = require('./../controllers/cakeController.js');
const {
	createReview,
	getCakeReviews,
} = require('./../controllers/reviewController.js');

router.route('/').get(getAllCake).post(restrictTo('admin'), createCake);
router
	.route('/:id')
	.get(getCake)
	.patch(restrictTo('admin'), updateCake)
	.delete(restrictTo('admin'), deleteCake);
router.route('/:id/review').post(createReview).get(getCakeReviews);

module.exports = router;

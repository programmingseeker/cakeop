const express = require('express');
const router = express.Router();
const {
	getAllReviews,
	getReview,
	deleteReview,
	updateReview,
	getCakeReviews,
} = require('../controllers/reviewController.js');

router.route('/').get(getAllReviews);
router.route('/cake/:id').get(getCakeReviews);
router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;

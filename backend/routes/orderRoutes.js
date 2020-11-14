const express = require('express');
const router = express.Router();
const {
	getAllOrders,
	getOrder,
	createOrder,
	updateOrderToPaid,
	getMyOrders,
} = require('../controllers/orderController.js');
const { isLoggedIn, restrictTo } = require('../controllers/authController.js');
router
	.route('/')
	.get(restrictTo('admin'), getAllOrders)
	.post(isLoggedIn, createOrder);

router.route('/myorders').get(isLoggedIn, getMyOrders);
router.route('/:id').get(isLoggedIn, getOrder);
router.route('/:id/pay').put(isLoggedIn, updateOrderToPaid);

module.exports = router;

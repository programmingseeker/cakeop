import express from 'express';
const router = express.Router();
import {
	getAllOrders,
	getOrder,
	createOrder,
	updateOrderToPaid,
	getMyOrders,
} from '../controllers/orderController.js';
import { isLoggedIn, restrictTo } from '../controllers/authController.js';
router
	.route('/')
	.get(restrictTo('admin'), getAllOrders)
	.post(isLoggedIn, createOrder);

router.route('/myorders').get(isLoggedIn, getMyOrders);
router.route('/:id').get(isLoggedIn, getOrder);
router.route('/:id/pay').put(isLoggedIn, updateOrderToPaid);

export default router;

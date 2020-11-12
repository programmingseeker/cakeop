import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import Order from '../models/orderModel.js';

export const getAllOrders = catchAsync(async (req, res, next) => {
	const orders = await Order.find();
	res.status(200).json({
		status: 'success',
		length: orders.length,
		orders,
	});
});

export const getOrder = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);
	if (!order) {
		next(
			new AppError(`There is no cake with this id ${req.params.id}`, 404)
		);
	} else {
		res.status(200).json({
			status: 'success',
			order,
		});
	}
});

export const createOrder = catchAsync(async (req, res, next) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		return next(new AppError('no order items', 400));
	} else {
		const newOrder = await Order.create({
			user: req.user.id,
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});
		res.status(201).json({ status: 'success', order: newOrder });
	}
});

export const updateOrderToPaid = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		next(new AppError('Order not found', 404));
	}
});

export const getMyOrders = catchAsync(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});

export const updateOrderToDelivered = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		next(new AppError('Order not found', 404));
	}
});

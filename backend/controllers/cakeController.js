const Cake = require('../models/cakeModel.js');
const Review = require('../models/reviewModel.js');

const APIFeatures = require('../utils/apiFeatures.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');

exports.getAllCake = catchAsync(async (req, res) => {
	const features = new APIFeatures(Cake.find(), req.query)
		.filter()
		.sort()
		.limitFields();

	let filteredCakes = await features.query;
	const filteredLength = filteredCakes.length;
	if (req.query.page && req.query.limit) {
		filteredCakes = await features.paginate().query;
	}
	// Response
	res.status(200).json({
		totalLength: filteredLength,
		length: filteredCakes.length,
		data: filteredCakes,
	});
});

exports.getCake = catchAsync(async (req, res, next) => {
	const cake = await Cake.findById(req.params.id);
	const cakeReviews = await Review.find({ cake: req.params.id });
	if (!cake) {
		next(
			new AppError(`There is no cake with this id ${req.params.id}`, 404)
		);
	} else {
		cake.reviews = cakeReviews;
		cake.ratingsQuantity = cakeReviews.length;
		res.status(200).json({
			status: 'success',
			data: cake,
		});
	}
});

exports.createCake = catchAsync(async (req, res) => {
	const cake = await Cake.create(req.body);
	res.status(201).json({
		status: 'success',
		data: cake,
	});
});

exports.updateCake = catchAsync(async (req, res, next) => {
	const updatecake = await Cake.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	if (!updatecake) {
		return next(
			new AppError(`There is no cake with this id ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		status: 'success',
		data: updatecake,
	});
});

exports.deleteCake = catchAsync(async (req, res, next) => {
	const cake = await Cake.findByIdAndDelete(req.params.id);
	if (!cake) {
		return next(
			new AppError(`There is no cake with this id ${req.params.id}`, 404)
		);
	}
	res.status(204).json({ status: 'success' });
});

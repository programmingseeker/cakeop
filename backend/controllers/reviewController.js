const Review = require('../models/reviewModel.js');
const catchAsync = require('../utils/catchAsync.js');
const APIFeatures = require('../utils/apiFeatures.js');
const Cake = require('../models/cakeModel.js');
const AppError = require('../utils/appError.js');

exports.createReview = catchAsync(async (req, res, next) => {
	const cake = await Cake.findById(req.params.id);
	if (cake) {
		const isReviewed = cake.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);
		if (isReviewed) {
			return next(new AppError('Product Already Reviewed', 400));
		}

		const review = {
			...req.body,
			user: req.user.id,
			userName: req.user.username,
			cake: req.params.id,
		};
		const newReview = await Review.create(review);

		cake.ratingsQuantity += 1;
		cake.ratingsAverage =
			(cake.ratingsAverage + newReview.ratings) / cake.ratingsQuantity;

		await cake.save();

		res.status(201).json({
			status: 'success',
			data: newReview,
		});
	} else {
		return next(new AppError('Product not found', 404));
	}
});

exports.getAllReviews = catchAsync(async (req, res) => {
	const features = new APIFeatures(Review.find(), req.query)
		.filter()
		.sort()
		.paginate()
		.limitFields();
	const reviews = await features.query;
	res.status(200).json({
		status: 'success',
		data: reviews,
	});
});

exports.getCakeReviews = catchAsync(async (req, res) => {
	const review = await Review.find({ cake: req.params.id });
	res.status(200).json({
		status: 'success',
		data: review,
	});
});

exports.getReview = catchAsync(async (req, res, next) => {
	let query = Model.findById(req.params.id);
	if (!query) {
		return next(new AppError('No document found with that ID', 404));
	}
	res.status(200).json({
		status: 'success',
		data: {
			data: query,
		},
	});
});

exports.updateReview = catchAsync(async (req, res, next) => {
	const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	if (!doc) {
		return next(new AppError('No document found with that ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			data: doc,
		},
	});
});

exports.deleteReview = catchAsync(async (req, res, next) => {
	const doc = await Model.findByIdAndDelete(req.params.id);
	if (!doc) {
		return next(new AppError('No document found with that ID', 404));
	}
	cake.ratingsQuantity -= 1;
	cake.ratingsAverage =
		(cake.ratingsAverage + newReview.ratings) / cake.ratingsQuantity;
	await cake.save();
	res.status(204).json({
		status: 'success',
		data: null,
	});
});

import Review from './../models/reviewModel.js';
import catchAsync from './../utils/catchAsync.js';
import APIFeatures from './../utils/apiFeatures.js';
import Cake from './../models/cakeModel.js';
import AppError from '../utils/appError.js';

export const createReview = catchAsync(async (req, res, next) => {
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

//get review for all cakes
export const getAllReviews = catchAsync(async (req, res, next) => {
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

//gets all the reviews for the cake with the given id
export const getCakeReviews = catchAsync(async (req, res, next) => {
	const review = await Review.find({ cake: req.params.id });
	res.status(200).json({
		status: 'success',
		data: review,
	});
});

//get review by id

export const getReview = catchAsync(async (req, res, next) => {
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

// edit a review

export const updateReview = catchAsync(async (req, res, next) => {
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

//delete a review

export const deleteReview = catchAsync(async (req, res, next) => {
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

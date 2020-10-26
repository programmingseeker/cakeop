import Review from './../models/reviewModel.js';
import catchAsync from './../utils/catchAsync.js';
import APIFeatures from './../utils/apiFeatures.js';

export const createReview = catchAsync(async (req, res, next) => {
	const review = {
		...req.body,
		user: req.user.id,
		cake: req.params.id,
	};
	console.log(req.user);
	const newReview = await Review.create(review);
	res.status(200).json({
		status: 'success',
		data: newReview
	});
});

//get review for all cakes
export const getAllReviews = catchAsync(async (req, res, next) => {
		const features = new APIFeatures(Review.find(), req.query)
		.filter()
		.sort()
		.paginate()
		.limitFields();
	const reviews = await features.query;
	res.status(200).json(
		{
			status: 'success',
			data: reviews
		}
	)
});

//gets all the reviews for the cake with the given id
export const getCakeReviews = catchAsync(async (req, res, next) => {
	const review = await Review.find({ cake: req.params.id });
	res.status(200).json(
		{
			status: 'success',
			data: review
		}
	)
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
			data: query
		}
	});
})

// edit a review

export const updateReview = catchAsync(async (req, res, next) => {
	const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});

	if (!doc) {
		return next(new AppError('No document found with that ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			data: doc
		}
	});
});

//delete a review

export const deleteReview = catchAsync(async (req, res, next) => {
	const doc = await Model.findByIdAndDelete(req.params.id);

	if (!doc) {
		return next(new AppError('No document found with that ID', 404));
	}

	res.status(204).json({
		status: 'success',
		data: null
	});
});

import Cake from './../models/cakeModel.js';
import Review from './../models/reviewModel.js';

import APIFeatures from './../utils/apiFeatures.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';

export const getAllCake = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(Cake.find(), req.query)
		.filter()
		.sort()
		.paginate()
		.limitFields();
	const cake = await features.query;
	// Response
	res.status(200).json({
		length: cake.length,
		data: cake,
	});
});

export const getCake = catchAsync(async (req, res, next) => {
	const cake = await Cake.findById(req.params.id);
	const cakeReviews = await Review.find({cake: req.params.id});
	if (!cake) {
		next(
			new AppError(`There is no cake with this id ${req.params.id}`, 404)
		);
	} else {
		cake.reviews = cakeReviews;
		res.status(200).json({
			status: 'success',
			data: cake,
		});
	}
});

export const createCake = catchAsync(async (req, res, next) => {
	//for now no validation
	const cake = await Cake.create(req.body);
	res.status(201).json({
		status: 'success',
		data: cake,
	});
});

export const updateCake = catchAsync(async (req, res, next) => {
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

export const deleteCake = catchAsync(async (req, res, next) => {
	const cake = await Cake.findByIdAndDelete(req.params.id);
	if (!cake) {
		return next(
			new AppError(`There is no cake with this id ${req.params.id}`, 404)
		);
	}
	res.status(204).json({ status: 'success' });
});

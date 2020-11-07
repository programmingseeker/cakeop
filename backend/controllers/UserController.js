import User from './../models/userModel.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';

export const getMe = catchAsync(async (req, res, next) => {
	const userMe = await User.findById(req.user.id).select('-password -__v');
	res.send(userMe);
});

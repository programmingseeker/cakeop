import bcrypt from 'bcryptjs';
import User from './../models/userModel.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';

export const getMe = catchAsync(async (req, res, next) => {
	const userMe = await User.findById(req.user.id).select('-password -__v');
	res.send(userMe);
});

export const updateMe = catchAsync(async (req, res, next) => {
	//find the current user
	const userMe = await User.findById(req.user.id);

	//password update
	if (
		req.body.password &&
		req.body.newPassword === req.body.confirmNewPassword
	) {
		if (userMe.checkPassword(req.body.password)) {
			// check for new password and change it
			userMe.password = req.body.confirmNewPassword;
			userMe.save();
			return res.status(200).json({
				message: 'password Changed',
			});
		} else {
			return next(new AppError('password is not correct', 400));
		}
	} else {
		return next(new AppError('invalid information', 400));
	}
});

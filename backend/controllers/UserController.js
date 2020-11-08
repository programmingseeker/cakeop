import jwt from 'jsonwebtoken';
import User from './../models/userModel.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import createJWT from './../utils/createJwt.js';

export const getMe = catchAsync(async (req, res, next) => {
	const userMe = await User.findById(req.user.id).select('-password -__v');
	res.send(userMe);
});

export const updateMe = catchAsync(async (req, res, next) => {
	//find the current user
	const userMe = await User.findById(req.user.id);
	if (
		req.body.password &&
		req.body.newPassword === req.body.confirmNewPassword
	) {
		if (userMe.checkPassword(req.body.password)) {
			// check for new password and change it
			userMe.password = req.body.confirmNewPassword;
			const token = createJWT(jwt, userMe.id, userMe.userType);
			res.cookie('jwt', token, {
				httpOnly: true,
				expires: new Date(
					Date.now() + process.env.JWTCOOKIEEXPIRES * 24 * 3600 * 1000
				),
			});
		} else {
			return next(new AppError('password is not correct', 400));
		}
	} else if (req.file) {
		userMe.profileImage = `/img/user/${req.file.filename}`;
	} else {
		return next(new AppError('invalid information', 400));
	}
	userMe.save();
	return res.status(200).json({
		message: 'User Updated',
	});
});

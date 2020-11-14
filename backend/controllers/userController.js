const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const Review = require('../models/reviewModel.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');
const createJWT = require('../utils/createJwt.js');

exports.getMe = catchAsync(async (req, res) => {
	let userMe = await User.findById(req.user.id).select('-password -__v');
	const reviews = await Review.find({ user: req.user._id });
	userMe.reviews = reviews;
	// userMe.reviews = reviews;
	res.send(userMe);
});

exports.updateMe = catchAsync(async (req, res, next) => {
	const userMe = await User.findById(req.user.id);
	if (
		req.body.password &&
		req.body.newPassword === req.body.confirmNewPassword
	) {
		if (userMe.checkPassword(req.body.password)) {
			userMe.password = req.body.confirmNewPassword;
			const token = createJWT(jwt, userMe.id, userMe.userType);
			res.cookie('jwt', token, {
				httpOnly: true,
				expires: new Date(
					Date.now() + process.env.JWTCOOKIEEXPIRES * 24 * 3600 * 1000
				),
			});
			await userMe.save();
		} else {
			return next(new AppError('password is not correct', 400));
		}
	} else if (req.file) {
		userMe.profileImage = req.file.filename;
		await userMe.save();
	} else {
		return next(new AppError('invalid information', 400));
	}
	return res.status(200).json({
		message: 'User Updated',
	});
});

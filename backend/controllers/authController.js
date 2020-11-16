const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const axios = require('axios');

const createJWT = require('./../utils/createJwt.js');
const User = require('./../models/userModel.js');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError.js');
dotenv.config();

const sendJWTResponse = (userInfo, message, statusCode, res) => {
	const token = createJWT(jwt, userInfo.id, userInfo.userType);
	res.cookie('jwt', token, {
		httpOnly: true,
		expires: new Date(
			Date.now() + process.env.JWTCOOKIEEXPIRES * 24 * 3600 * 1000
		),
	});
	res.status(statusCode).json({
		status: 'success',
		message,
		user: {
			createdAt: userInfo.createdAt,
			userType: userInfo.userType,
			username: userInfo.username,
		},
	});
};

exports.postLogin = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({
		email,
	});
	if (!user || !(await user.checkPassword(password))) {
		return next(new AppError('Incorrect email or password', 401));
	}
	sendJWTResponse(user, 'you are now logged in', 200, res);
});

exports.postSignUp = catchAsync(async (req, res, next) => {
	const { email, username, password, confirmPassword } = req.body;
	const user = await User.findOne({
		email,
	});
	if (user) {
		return next(
			new AppError(
				'Email is already registered try with another email',
				409
			)
		);
	}
	if (!confirmPassword || password !== confirmPassword) {
		return next(new AppError('Password confirmation does not match', 409));
	}
	const newUser = await User.create({
		username,
		email,
		password,
	});
	sendJWTResponse(newUser, 'You are now signed Up', 201, res);
});

exports.googleLogin = catchAsync(async (req, res, next) => {
	const { tokenId } = req.body;
	const { data } = await axios.get(
		`https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`
	);
	const { azp, aud, sub, email, picture, name } = data;
	if (azp === aud && aud === process.env.GOOGLE_CLIENT_ID) {
		const user = await User.findOne({ googleId: sub });
		if (user) {
			sendJWTResponse(user, 'you are now logged in', 200, res);
		} else {
			const newUser = await User.create({
				username: name,
				email,
				profileImage: picture,
			});
			sendJWTResponse(newUser, 'You are now signed Up', 201, res);
		}
	} else {
		return next(
			new AppError('client not authorized! refresh and try again!')
		);
	}
});

exports.getLogout = (req, res, next) => {
	res.cookie('jwt', '', {
		expires: new Date(Date.now() * 0),
		httpOnly: true,
	});
	res.status(200).json({
		status: 'success',
		data: 'you are sucessfully logged out',
	});
};

exports.restrictTo = (...user) => {
	return (req, res, next) => {
		if (typeof req.user === 'undefined') {
			return next(new AppError('you are not logged in', 400));
		} else if (!user.includes(req.user.userType)) {
			return next(
				new AppError('you are Authorised to perform this action', 401)
			);
		}
		next();
	};
};

exports.seralizeUser = catchAsync(async (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		try {
			const decoded = await jwt.verify(token, process.env.JWTSECRET);
			const user = await User.findById(decoded.uid);
			req.user = user;
			next();
		} catch (err) {
			req.user = null;
			return next();
		}
	} else {
		req.user = null;
		next();
	}
});

exports.isLoggedIn = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		next(new AppError('you are not logged in to perform this action', 401));
	}
};

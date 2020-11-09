import jwt from 'jsonwebtoken';
import passport from 'passport';
import createJWT from './../utils/createJwt.js';
import User from './../models/userModel.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import dotenv from 'dotenv';
dotenv.config();

export const seralizeUser = catchAsync(async (req, res, next) => {
	const token = req.cookies['jwt'];
	if (token) {
		try {
			const decoded = await jwt.verify(token, process.env.JWTSECRET);
			const user = await User.findById(decoded.uid);
			req.user = user;
			res.locals.user = user;
		} catch (err) {
			return next();
		}
	}
	next();
});

export const postLogin = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({
		email,
	});
	if (!user || !(await user.checkPassword(password))) {
		return next(new AppError('Incorrect email or password', 401));
	}
	const token = createJWT(jwt, user.id, user.userType);
	res.cookie('jwt', token, {
		httpOnly: true,
		expires: new Date(
			Date.now() + process.env.JWTCOOKIEEXPIRES * 24 * 3600 * 1000
		),
	});
	res.status(200).json({
		status: 'success',
		message: 'you are now logged in',
		user: {
			createdAt: user.createdAt,
			userType: user.userType,
			username: user.username,
		},
	});
});

export const postSignUp = catchAsync(async (req, res, next) => {
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

	// check for password validation
	if (!confirmPassword || password !== confirmPassword) {
		return next(new AppError('Password confirmation does not match', 409));
	}
	// Create a new user
	const newUser = await User.create({
		username,
		email,
		password,
	});
	//sign a jwt token
	const token = createJWT(jwt, newUser.id, newUser.userType);
	res.cookie('jwt', token, {
		httpOnly: true,
		expires: new Date(
			Date.now() + process.env.JWTCOOKIEEXPIRES * 24 * 3600 * 1000
		),
	});
	res.status(201).json({
		status: 'success',
		message: 'You are now signed Up',
		user: {
			createdAt: newUser.createdAt,
			userType: newUser.userType,
			username: newUser.username,
		},
	});
});

export const getLogout = (req, res, next) => {
	res.cookie('jwt', '', {
		expires: new Date(Date.now() * 0),
		httpOnly: true,
	});
	res.status(200).json({
		status: 'success',
		data: 'you are sucessfully logged out',
	});
};

export const restrictTo = (...user) => {
	return (req, res, next) => {
		// if user is not logged in then redirect to login page
		if (typeof req.user === 'undefined') {
			return res.redirect('/login');
			// if user is not admin render a page telling that he is not an admin
		} else if (!user.includes(req.user.userType)) {
			return res.redirect('/notauthorised');
		}
		next();
	};
};

//this  method shd be accessed
export const googlePassportAuthenticate = passport.authenticate('google', {
	scope: ['profile', 'email'],
});

//oath utility functions
export const googlemiddlewareauth = passport.authenticate('google', {
	failureRedirect: '/login',
	session: false,
});

export const googlePassportAuthRedirect = async (req, res) => {
	const { _id, userType } = req.user;
	const token = createJWT(jwt, _id, userType);
	res.cookie('jwt', token, {
		httpOnly: true,
		expires: new Date(Date.now() + 24 * 3600 * 1000),
	});
	res.locals.user = req.user;
	res.redirect('/dashboard');
};

export const isLoggedIn = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		next(new AppError('you are not logged in to perform this action', 401));
	}
};

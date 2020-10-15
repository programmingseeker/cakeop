//This is a middleware function(considered as a error middleware func by default since it has (err,req,res,next) as its arguments)
import AppError from './../utils/appError.js';

const handleValidationError = (err) => {
	if (err.errors.password.kind === 'minlength')
		return new AppError(
			'password length must be more that 6 characters',
			err.statusCode
		);
};

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

const sendErrorProd = (err, req, res) => {
	if (req.originalUrl.startsWith('/api')) {
		// Operational, trusted error: send message to client
		if (err.isOperational) {
			return res.status(err.statusCode).json({
				status: err.status,
				message: err.message,
			});
		}
		// B) Programming or other unknown error: don't leak error details
		// 1) Log error
		console.error('Error', err);
		// 2) Send generic message
		return res.status(500).json({
			status: 'error',
			message: 'Something went wrong',
		});
	}
};

const sendErrorDev = (err, req, res) => {
	if (req.originalUrl.startsWith('/api')) {
		return res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	}
};

export default (err, req, res, next) => {
	err.status = err.status || 'fail';
	err.statusCode = err.statusCode || 500;
	//sending the response
	if (process.env.NODE_ENV === 'development') {
		if (err.name === 'ValidationError') err = handleValidationError(err);
		sendErrorDev(err, req, res);
	} else if (process.env.NODE_ENV === 'production') {
		console.log('errIs', err);
		let error = JSON.parse(JSON.stringify(err));
		console.log('errorIs', error);
		// let error = { ...err };
		error.message = err.message;
		if (error.name === 'CastError') error = handleCastErrorDB(error);
		if (error.errors.password.name === 'ValidatorError')
			error = handleValidationError(error);
		sendErrorProd(error, req, res);
	}
};

import AppError from './appError.js';
export default (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => {
			next(err);
		});
	};
};
//For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the next() function, where Express will catch and process them

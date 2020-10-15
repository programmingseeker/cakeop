class AppError extends Error {
	constructor(message, statusCode) {
		super(message);

		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.isOperational = true; //To make even the unexpected error to be handled with this class
		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;

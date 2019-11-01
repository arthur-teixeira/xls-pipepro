const handler = (msg, status) => {
	const error = new Error(msg);
	error.statusCode = status;
	throw error;
};


module.exports = {
	middleware: (err, req, res, next) => {
		res.status(err.statusCode).json({ err: err.toString() });
	},
	notFoundError: msg => {
		handler(msg, 404);
	},
	validationError: msg => {
		handler(msg, 401);
	},
	internalServerError: msg => {
		handler(msg, 500);
	}
};

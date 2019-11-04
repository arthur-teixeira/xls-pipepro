const handler = (msg, status = 500) => {
  const error = new Error(msg);
  error.statusCode = status;
  throw error;
};


module.exports = {
  //eslint-disable-next-line no-unused-vars
  middleware: (err, req, res, next) => {
    res.status(500).send(err.toString())
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

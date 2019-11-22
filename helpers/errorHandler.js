const errCreator = (msg, status) => {
  const err = new Error(msg);
  err.status = status;
  return err;
}
module.exports = {
  //eslint-disable-next-line no-unused-vars
  middleware: (err, req, res, next) => {
    res.status(err.status || 500).send(err.toString());
  },
  validationError: msg => errCreator(msg, 401),
  notFound: msg => errCreator(msg, 404),
  unauthorizedError: msg => errCreator(msg, 400)
};

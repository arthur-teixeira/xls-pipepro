module.exports = {
  //eslint-disable-next-line no-unused-vars
  middleware: (err, req, res, next) => {
    res.status(err.status || 500).send(err.toString());
  },
  errCreator: (msg, status) => {
    const err = new Error(msg);
    err.status = status;
    return err;
  }
};

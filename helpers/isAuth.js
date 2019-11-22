const jwt = require("jsonwebtoken");
const createErr = require("./errorHandler").errCreator;

module.exports = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    const err = createErr("Token não fornecido", 401);
    next(err);
    throw err;
  };
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    next(err);
  }
  req.id = decoded.id;
  next();
};
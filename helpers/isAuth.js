const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler").validationError;

module.exports = (req) => {
  const token = !!(req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token);

  if (!token) return validationError("Não autorizado: Token não fornecido");
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return validationError("Não autorizado: Token inválido");
    req.email = decoded.email;
  });
};
const jwt = require("jsonwebtoken");
const createErr = require("./errorHandler").errCreator;

module.exports = (req) => {
  const token = !!(req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token);

  if (!token) return createErr("Não autorizado: Token não fornecido", 401);
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return createErr("Não autorizado: Token inválido", 401);
    req.email = decoded.email;
  });
};
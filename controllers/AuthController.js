const AuthService = require("../services/AuthService");
const createErr = require("../helpers/errorHandler").validationError;
class AuthController {

  static async register(req, res, next) {
    const { name, email, password } = req.body;
    const UserService = new AuthService({ name, email, password });
    try {
      await UserService.saveUser();
      res.sendStatus(201);
    } catch (err) {
      const newErr = validationError(err);
      next(newErr);
    }
  }

  static async authenticate(req, res, next) {
    const { email, password } = req.body;
    const UserService = new AuthService({ email, password });
    await UserService.loadUser();
    UserService.user.checkPassword(password, (err, same) => {
      if (err) return next(err);
      if (!same) {
        const err = validationError("Email e/ou senha incorretos.");
        return next(err);
      }
      UserService.generateJWT(res);
    });

  }

  static checkToken(req, res) {
    console.log(req.cookies);
    res.sendStatus(200);
  }
}

module.exports = AuthController;
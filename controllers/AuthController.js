const User = require("../models/User");
const validationError = require("../helpers/errorHandler").validationError;
const AuthService = require("../services/AuthService")
class AuthController {

  static async register(req, res, next) {
    const { name, email, password } = req.body;
    const UserService = new AuthService({ name, email, password });
    try {
      await UserService.saveUser();
      res.send("salvou");
    } catch (err) {

    }

  }

  // static async register(req, res, next) {
  //   const { name, email, password } = req.body;

  //   const UserService = new AuthService({ name, email, password });

  //   UserService.saveUser();

  //   try {
  //     const user = await User.findOne({ email });
  //     if (user) {
  //       return validationError("um usuário com este email já existe.");
  //     }

  //     if (!UserService.isValid) {
  //       return validationError("Usuário inválido.");
  //     }

  //     UserService.saveUser();

  //     res.sendStatus(200);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  static async authenticate(req, res, next) {
    const { email, password } = req.body;
    const UserService = new AuthService({ email, password });
    try {
      await UserService.findUser();
      UserService.user.checkPassword(password, (err, same) => {
        if (err) throw err;
        if (!same) validationError("Email e/ou senha incorretos");
        UserService.generateJWT(res);
      })
    } catch (err) {
      next(err);
    }
  }

  static checkToken(req, res) {
    res.sendStatus(200);
  }
}

module.exports = AuthController;
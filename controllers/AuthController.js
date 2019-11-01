const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validationError = require("../helpers/errorHandler").validationError;
class AuthController {
  static async register(req, res, next) {
    const { name, email, password } = req.body;
    try {
      this.user = await User.findOne({ email });

      if (this.isValid()) {
        return validationError("um usuário com este email já existe.");
      }

      this.saveUser();

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  static async authenticate(req, res, next) {
    const { email, password } = req.body;
    try {
      this.findUser(email)
      if (!this.user) return this.wrongInput();
      if (this.checkPassword(password))
        return this.generateJWT(email, res);
    } catch (err) {
      next(err);
    }
  }

  async findUser() {
    this.user = await User.findOne({ email });
  }

  async isValid() {
    return !!this.user;
  }

  saveUser() {
    const { name, email, password } = this.user;
    const user = new User({ name, email, password });
    return user.save();
  }

  checkPassword() {
    const { password } = this.user
    this.user.checkPassword(password, (err, same) => {
      if (err) throw err;
      if (!same) return this.wrongInput;
      return true;
    });
  }

  wrongInput() {
    return validationError("Email e/ou senha incorretos");
  }

  generateJWT(email, res) {
    const token = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: "1h"
    });
    return res.cookie("token", token, { httpOnly: true }).sendStatus(200);
  }



  checkToken(req, res) {
    res.sendStatus(200);
  }
}


module.exports = AuthController;
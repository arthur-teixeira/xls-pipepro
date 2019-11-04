const jwt = require("jsonwebtoken");
const validationError = require("../helpers/errorHandler").validationError;
const User = require("../models/User");

class AuthService {

  constructor(user) {
    this._userData = user;
  }

  get isValid() {
    return !!(this.newUser.name && this.newUser.email && this.newUser.password);
  }

  get isLoggedIn() {
    return this._currentUser ? true : false
  }

  async saveUser() {
    const { name, email, password } = this._userData;
    const oldUser = await User.findOne({ email });
    if (oldUser) return validationError("Usuário com este email já existente");

    const user = new User({ name, email, password });
    this.newUser = user;
    return user.save();
  }


  get user() {
    return this._currentUser;
  }
  // checkPassword(password) {
  //   return this._currentUser.checkPassword(password, (err, same) => {
  //     if (err) throw err;
  //     // if (!same) throw new Error("Email e/ou senha incorretos");
  //     console.log(same)
  //   });
  // }

  async findUser() {
    const user = await User.findOne({ email: this._userData.email });
    if (user) this._currentUser = user;
    else validationError("usuário inexistente");
  }

  generateJWT(res) {
    const token = jwt.sign({ email: this._currentUser.email }, process.env.SECRET, {
      expiresIn: "1h"
    });
    return res.cookie("token", token, { httpOnly: true }).sendStatus(200);
  }


}

module.exports = AuthService;
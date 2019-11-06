const jwt = require("jsonwebtoken");

const User = require("../models/User");

class AuthService {

  constructor(user) {
    this._userData = user;
  }

  get isValid() {
    return !!(this.newUser.name && this.newUser.email && this.newUser.password);
  }

  get isLoggedIn() {
    return !!this._currentUser;
  }

  async saveUser() {
    const { name, email, password } = this._userData;
    const oldUser = await User.findOne({ email });
    if (oldUser) throw new Error("Usuário com este email já existente");

    const user = new User({ name, email, password });
    this.newUser = user;
    return user.save();
  }


  get user() {
    if (this.isLoggedIn) return this._currentUser;
    else return null;
  }

  async loadUser() {
    const user = await User.findOne({ email: this._userData.email });
    if (user) this._currentUser = user;
    else throw new Error("usuário inexistente");
  }

  generateJWT(res) {
    const token = jwt.sign({ email: this._currentUser.email }, process.env.SECRET, {
      expiresIn: "1h"
    });
    return res.cookie("token", token, { httpOnly: true }).sendStatus(200);
  }


}

module.exports = AuthService;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validationError = require("../helpers/errorHandler").validationError;
class AuthController {
	static async register(req, res, next) {
		const { name, email, password } = req.body;
		try {
			await this.validate(email);
			this.saveUserToDatabase(name, email, password);
			res.sendStatus(200);
		} catch (err) {
			next(err);
		}
	}

	static async validate(email) {
		const oldUser = await User.findOne({ email });
		if (oldUser) return validationError("um usuário com este email já existe.");
		return;
	}

	static saveUserToDatabase(name, email, password) {
		const user = new User({ name, email, password });
		return user.save();
	}

	static async checkUser(user) {
		if (!user) return this.wrongInput();
	}

	static checkPassword(user, password) {
		user.checkPassword(password, (err, same) => {
			if (err) throw err;
			if (!same) return this.wrongInput;
			return true;
		});
	}

	static wrongInput() {
		return validationError("Email e/ou senha incorretos");
	}

	static generateJWT(email, res) {
		const token = jwt.sign({ email }, process.env.SECRET, {
			expiresIn: "1h"
		});
		return res.cookie("token", token, { httpOnly: true }).sendStatus(200);
	}

	static async authenticate(req, res, next) {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		try {
			await this.checkUser(user);
			if (this.checkPassword(password))
				return this.generateJWT(email, res);
		} catch (err) {
			next(err);
		}
	}

	static checkToken(req, res) {
		res.sendStatus(200);
	}
}


module.exports = AuthController;
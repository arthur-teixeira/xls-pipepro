const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const brcypt = require("bcrypt");

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const saltRounds = 14;

UserSchema.pre("save", function (next) {
	if (this.isNew || this.isModified("password")) {
		brcypt.hash(this.password, saltRounds, (err, hashedPassword) => {
			if (err) return next(err);

			this.password = hashedPassword;
			return next();
		});
	} else next();
});

UserSchema.methods.checkPassword = function (password, cb) {
	brcypt.compare(password, this.password, (err, same) => {
		if (err) cb(err);
		else cb(null, same);
	});
};

module.exports = mongoose.model("user", UserSchema);

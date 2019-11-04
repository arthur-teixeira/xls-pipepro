const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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
    bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
      if (err) return next(err);

      this.password = hashedPassword;
      return next();
    });
  } else next();
});

UserSchema.methods.checkPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) cb(err, null);
    else cb(null, same);
  });
};

module.exports = mongoose.model("user", UserSchema);

const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

//.........................................

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  email: {
    type: String,
    // minlength: 10,
    required: true,
    // lowercase: true,
    // validate(value) {
    //   if (!validator.isEmail(value)) throw new Error("Email is invalid!!!");
    // },
  },

  password: {
    type: String,
    required: true,
    // validate(value) {
    //   if (!validator.isStrongPassword(value))
    //     throw new Error("Password is invalid!!!");
    // },
  },
});

// module.exports = mongoose.model("user", userSchema);

//.........................................

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };

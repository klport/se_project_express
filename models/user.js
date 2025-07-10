const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    required: [true, "The avatar filed is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator: (v) => isEmail(v), // is this correct ?
      message: "Wrong email format",
    },
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    select: false, // prevent password from being showed to user
  },
});

// STATIC find user by credentials method
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password") // allows the code to read the pw
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }

        return user; // now user is available
      });
    });
};

module.exports = mongoose.model("user", userSchema);

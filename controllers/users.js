const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  CONFLICT_ERROR,
  UNAUTHORIZED,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// POST /users

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  // hash pw before sending
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password; // Remove password before sending
      return res.status(201).send(userObj);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.code === 11000) {
        return res
          .status(CONFLICT_ERROR)
          .send({ message: "Email already in use" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred while creating the user" });
    });
};

// POST /users  - login
// receives the email and password
// check that the email provided corrsponds to an existsing user in the datsbase
// check that the password is correct (ie: that it matches the password stored in the database)
// create a jsonwebtoken (and embed the user's id into it)
// send that token back to the client

const userLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(BAD_REQUEST).send({ message: "Invalid data" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return res.status(UNAUTHORIZED).send({ message: "Invalid User data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Invalid error" });
    });
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid user ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateUserProfile = (req, res) => {
  const { name, avatar } = req.body;

  // Only allow updating name and avatar
  return User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    {
      new: true, // Return the updated document
      runValidators: true, // Ensure validators in schema are applied
    }
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error" });
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  userLogin,
  updateUserProfile,
};

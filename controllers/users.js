const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");
const NotFoundError = require("../errors/not-found-error");
const UnauthorizedError = require("../errors/unauthorized-error");

const { JWT_SECRET } = require("../utils/config");

// POST /users

const createUser = (req, res, next) => {
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
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }
      return next(err);
    });
};

// POST /users  - login
// receives the email and password
// check that the email provided corrsponds to an existsing user in the datsbase
// check that the password is correct (ie: that it matches the password stored in the database)
// create a jsonwebtoken (and embed the user's id into it)
// send that token back to the client

const userLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Invalid data provided"));
  }
  return User.findUserByCredentials(email, password) //
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError("Invalid User data"));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID format"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      return next(err);
    });
};

const updateUserProfile = (req, res, next) => {
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
        throw new NotFoundError("User Not Found");
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID format"));
      }
      // For any other unexpected error
      return next(err);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  userLogin,
  updateUserProfile,
};

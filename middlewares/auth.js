const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  // 1. no header OR does not start with Bearer
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization required");
  }

  // 2. extract token
  const token = authorization.replace("Bearer ", "");

  try {
    // 3. verify token
    req.user = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError("Authorization required");
  }

  return next();
};

module.exports = auth;

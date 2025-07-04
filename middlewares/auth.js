const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  // step 1 : get the auth header
  const { authorization } = req.headers;

  // step 2: check if authorization header exists
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization required" });
  }
  // step 3: extract the token
  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    // step 4: verify the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // step 5: handle invalid token
    return res.status(401).json({ message: "Authorization required" });
  }
  // step 6: add user info to request and continue
  req.user = payload;
  next();
};

module.exports = auth;

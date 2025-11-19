const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

const auth = (req, res, next) => {
  // step 1 : get the auth header
  const { authorization } = req.headers; // headers: {authorization: Bearer 19281892jd192j192j981j28fj12fj198f2j128}

  // step 2: check if authorization header exists
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).json({ message: "Authorization required" });
  }
  // step 3: extract the token
  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    // step 4: verify the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // step 5: handle invalid token
    return res.status(UNAUTHORIZED).json({ message: "Authorization required" });
  }
  // step 6: add user info to request and continue
  req.user = payload;
  return next();
};

//const req = {statusCodes: 11, user: {_id: 12j1928j19j9je1}}

module.exports = auth;

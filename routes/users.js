const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  userLogin,
} = require("../controllers/users");

router.post("/login", userLogin);
// router.get("/", getUsers);
// router.get("/:userId", getUser);
// router.post("/", createUser);

module.exports = router;

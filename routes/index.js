const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingitem");
const errors = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);

// STEP 4 - PROJECT 13
app.post("/signin", login);
app.post("/signup", createUser);

router.use((req, res) => {
  res.status(errors.NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;

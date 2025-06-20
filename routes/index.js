const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingitem");
const errors = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(errors.NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;

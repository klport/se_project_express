const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingitem");
const { userLogin, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const errors = require("../utils/errors");

router.use("/items", itemRouter);
router.post("/signin", userLogin);
router.post("/signup", createUser);

const getTest = (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
};
router.post("/test", getTest);

router.use(auth);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(errors.NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;

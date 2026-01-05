const router = require("express").Router();
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

const NotFoundError = require("../controllers/errors/not-found-error");

const userRouter = require("./users");
const itemRouter = require("./clothingitem");
const { userLogin, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use("/items", itemRouter);
router.post("/signin", validateLogin, userLogin);
router.post("/signup", validateUserBody, createUser);

const getTest = (req, res) => {
  res.status(200).send(req.body);
};
router.post("/test", getTest);

router.use(auth);
router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;

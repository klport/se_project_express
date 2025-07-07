const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingitem");
const { userLogin, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use("/items", itemRouter);
router.post("/signin", userLogin);
router.post("/signup", createUser);

router.use(auth);
router.use("/users", userRouter);
// router.use((req, res) => {
//  res.status(errors.NOT_FOUND).send({ message: "Router not found" });
// });

module.exports = router;

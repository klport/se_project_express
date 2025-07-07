const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const { updateUserProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use(auth);
router.get("/me", getCurrentUser);
router.patch("/me", updateUserProfile);

module.exports = router;

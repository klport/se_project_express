const router = require("express").Router();
const { validateUserUpdate } = require("../middlewares/validation");

const { getCurrentUser } = require("../controllers/users");
const { updateUserProfile } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", validateUserUpdate, updateUserProfile);

module.exports = router;

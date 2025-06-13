const router = require("express").Router();
const { createLikeLike, deleteLike } = require("../controllers/likes");

router.post("/items/:itemId/likes", createLike);
router.delete("/items/:itemId/likes", deleteLike);

module.exports = router;

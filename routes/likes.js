const router = require("express").Router();
const { likeItem, dislikeItem } = require("../controllers/likes");

router.post("/items/:itemId/likes", likeItem); // like
router.delete("/items/:itemId/likes", dislikeItem); // delete

module.exports = router;

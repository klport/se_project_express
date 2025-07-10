const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");

router.get("/", getItems);

router.use(auth);

router.post("/", createItem); // /items/

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId", deleteItem);

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;

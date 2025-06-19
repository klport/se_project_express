const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// add likeItem, dislikeItem

// starts with /items

router.post("/", createItem); // /items/

router.get("/", getItems);

router.put("/:itemId", updateItem); // /items/:itemId

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId", deleteItem);

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;

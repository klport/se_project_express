const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItem");

// CRUD //

// CREATE
router.post("/", createItem);

// READ
router.get("/", getItems);

// UPDATE

router.put("/:itemId", updateItem);

// DELETE

router.delete("/:itemId", deleteItem);

// GET /items — returns all clothing items
// POST /items — creates a new item
// DELETE /items/:itemId — deletes an item by _id

module.exports = router;

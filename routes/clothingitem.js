const router = require("express").Router();
const { validateCardBody, validateId } = require("../middlewares/validation");

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

router.post("/", validateCardBody, createItem);
// POST to /items/

router.put("/:itemId/likes", validateId, likeItem);

router.delete("/:itemId", validateId, deleteItem);

router.delete("/:itemId/likes", validateId, dislikeItem);

module.exports = router;

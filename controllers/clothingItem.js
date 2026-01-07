const { default: mongoose } = require("mongoose");
const ClothingItem = require("../models/clothingItem");

const BadRequestError = require("../errors/bad-request-error");
const ForbiddenError = require("../errors/forbidden-error");
const NotFoundError = require("../errors/not-found-error");

// GET /clothingItems

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  // Creates a new clothing item in MongoDB with ClothingItem.create
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(err); // Let error handler deal with other errors
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      next(err);
    });
};

const deleteItem = (req, res, next) => {
  // Find the item 1st, check if the current user is the owner, delete it if they are. Otherwise, return a 403 err code.
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      // Check ownership
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("You are not allowed to delete this item");
      }

      // Owner matches — proceed with deletion
      return item.deleteOne().then(() => {
        res.status(200).send({ message: "Item deleted" });
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
    });
};

// like & dislike items

// LIKE ITEM
const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  if (!mongoose.isValidObjectId(itemId)) {
    return next(new BadRequestError("Invalid item ID format"));
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } }, // Adds _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => res.status(200).send(item))
    .catch(next);
};

// DISLIKE ITEM

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;
  if (!mongoose.isValidObjectId(itemId)) {
    return next(new BadRequestError("Invalid item ID format"));
  }
  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => res.status(200).send(item))
    .catch(next);
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};

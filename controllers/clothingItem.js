const ClothingItem = require("../models/clothingItem");
const errors = require("../utils/errors");

// GET /clothingItems

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      res.status(errors.INTERNAL_SERVER_ERROR).send({
        message: "Error from createItem",
        err,
      });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      res
        .status(errors.INTERNAL_SERVER_ERROR)
        .send({ message: "Error from getItems", err });
    });
};

// POST

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      res
        .status(errors.INTERNAL_SERVER_ERROR)
        .send({ message: "Error from updateItem", err });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((_item) => res.status(204).send({}))
    .catch((err) => {
      res
        .status(errors.INTERNAL_SERVER_ERROR)
        .send({ message: "Error from deleteItem", err });
    });
};

// like & dislike items

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // adds _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = errors.NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      res
        .status(errors.NOT_FOUND)
        .send({ message: "An error occured while liking the item", err });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // removes _id from the array
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = errors.NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      res
        .status(errors.NOT_FOUND)
        .send({ message: "An error occured while disliking the item", err });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};

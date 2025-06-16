const ClothingItem = require("../models/clothingItem");
const errors = require("../utils/errors");

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = errors.NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err.name, err.message);
      res
        .status(errors.INTERNAL_SERVER_ERROR)
        .send({ message: "An error occured while liking the item" });
    });
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = errors.NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err.name, err.message);
      res
        .status(errors.INTERNAL_SERVER_ERROR)
        .send({ message: "An error occured while disliking the item" });
    });
};

const errorHandler = (err, req, res, next) => {
  // Express requires 4 parameters for error handling middleware

  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
};

module.exports = errorHandler;

// .catch((err) => {
//   if (err.name === "CastError") {
//     err.statusCode = 400;
//     err.message = "Invalid item ID format";
//   } else if (err.statusCode === 404) {
//     err.message = "Item not found";
//   } else {
//     err.statusCode = 500;
//     err.message = "Internal Server Error";
//   }
//   next(err);
// });

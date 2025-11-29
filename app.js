require("dotenv").config();

const { errors } = require("celebrate");
const cors = require("cors");
const {
  validateCardBody,
  validateUserBody,
  validateLogin,
  validateId,
} = require("./middlewares/validation");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
// const { INTERNAL_SERVER_ERROR } = require("./utils/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(requestLogger);
app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors()); //celebrate error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

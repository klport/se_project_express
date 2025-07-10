const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const mainRouter = require("./routes/index");
const { INTERNAL_SERVER_ERROR } = require("./utils/errors");

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

app.use("/", mainRouter);

app.use((err, req, res, _next) => {
  console.error("Global error handler caught:", err.message);
  res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

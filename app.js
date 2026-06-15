const express = require("express");
const cors = require("cors");
const productRouter = require("./routes");
const mongoose = require("mongoose");
const userRouter = require("./userrouter");
const server = express();

mongoose
  .connect("mongodb://localhost:27030/cs477")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("DB error:", err);
  });

server.use(cors());
server.use(express.json());

server.use("/product", productRouter);
server.use("/user", userRouter);
server.use((err, req, res, next) => {
  res.send(err.message);
});
// server.use((err, req, res, next) => {
//   res.send(err.message);
// });
server.listen(3000, () => console.log("listening on port 3000"));

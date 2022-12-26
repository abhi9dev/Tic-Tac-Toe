const mongoose = require("mongoose");
var crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

const mongoPath =
  "mongodb+srv://abhi9:abhi21@cluster0.poshvg2.mongodb.net/Tic-Tac-Toe?retryWrites=true&w=majority";

mongoose.connect(mongoPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
  
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(3001, () => {
  console.log("Server is running on PORT 3001");
});

// const connectToMongoDB = async () => {
//   await mongo().then((mongoose) => {
//     try {
//       console.log("connected to mongodb!");
//     } catch (err) {
//       console.log(err);
//     }
//   });
// };

// const hash = crypto.createHash("sha256").update("123456").digest("base64");
// console.log(hash);

// connectToMongoDB();

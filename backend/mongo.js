var mongoose = require("mongoose");
var dbName = "Tic-Tac-Toe";
const mongoPath = `mongodb+srv://abhi9:abhi21@cluster0.poshvg2.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const Mongoose = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
  });

  return mongoose;
};

module.exports = Mongoose;

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  hashPass: {
    type: String,
    required: true,
  },
  games: [
    {
      opponent: {
        required: true,
        default: "",
        type: String,
      }, // contains userName
      board: {
        type: Array,
        default: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
      },
      result: {
        type: String,
        default: "playing",
      },
      lastMove: {
        type: Date,
      },
      lastTurn: {
        type: String,
        default: "",
        required: true,
      },
      yourPiece: {
        type: String,
        default: "X",
        required: true,
      },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

const express = require("express");
const User = require("./Models/User");
const router = express.Router();

router.get("/api/getUsers", async (req, res) => {
  const users = await User.find();

  try {
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.response.data.message);
  }
});

//search by userName
router.get("/api/getUsers/:id", async (req, res) => {
  const users = await User.findOne({ userName: req.params.id });

  try {
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.response.data.message);
  }
});

//search by email
router.get("/api/getUsers1/:email", async (req, res) => {
  const users = await User.findOne({ email: req.params.email });

  try {
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.response.data.message);
  }
});

//register of new Users
router.post("/api/registerUser", (req, res) => {
  // console.log(req.body);
  var userr = new User(req.body);
  userr.save();
  res.send("Congratulations!!! Account created");
});

//register a new game
router.patch("/api/createGame/:id", (req, res) => {
  // console.log(req.body);
  var data = req.body.opponent;
  var user = req.params.id;
  console.log(user, data.userName);

  const game = {
    opponent: data.userName,
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    result: "playing",
    lastMove: Date(),
    lastTurn: "p",
    yourPiece: req.body.opponentPiece,
  };

  User.updateOne({ userName: user }, { $push: { games: game } }).then(
    (user) => {
      res.send(user);
    }
  );
});

//get the board game data which is currently being played between user and opponent
router.get("/api/getBoard/:user/:opponent", async (req, res) => {
  await User.find({ userName: req.params.user }).then((userr) => {
    // console.log(userr[0]);

    var games = userr[0].games; // array of all games played by user or ongoing games
    // console.log(games);
    games.map((game) => {
      if (game.opponent == req.params.opponent && game.result == "playing") {
        // console.log(game.board);
        res.send(game.board);
      }
    });
  });
});

//updating the given board data which is currently being played between user and opponent
router.patch("/api/updateBoard/:user/:opponent", (req, res) => {
  var updatedBoard = req.body.board; //move played by one of the player
  var playerMove = req.body.turn;

  // console.log(playerMove);

  //updating user board
  User.findOne({ userName: req.params.user }).then((user) => {
    var games = user.games; // all games which are played by player user, or ongoing games.
    // console.log(games);
    user.games.map((game) => {
      if (game.opponent == req.params.opponent && game.result == "playing") {
        game.board = updatedBoard;
        game.lastMove = Date();
        game.lastTurn = playerMove;
      }
    });

    // user.save();
    User.updateOne(
      { userName: req.params.user },
      { $set: { games: games } }
    ).then((user) => {
      res.send(user);
    });

    res.send("user board updated");
  });

  //updating opponent board
  User.findOne({ userName: req.params.opponent }).then((user) => {
    var games = user.games;

    user.games.map((game) => {
      if (game.opponent == req.params.user && game.result == "playing") {
        game.board = updatedBoard;
        game.lastMove = Date();
        game.lastTurn = playerMove;
      }
    });

    // user.save();

    User.updateOne(
      { userName: req.params.opponent },
      { $set: { games: games } }
    ).then((user) => {
      res.send(user);
    });

    res.send("opponent board updated");
  });
});

module.exports = router;

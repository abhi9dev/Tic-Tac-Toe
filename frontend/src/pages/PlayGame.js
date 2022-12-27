import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Box, Paper } from "@mui/material";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import axios from "axios";

import backArrow from "../assets/images/backArrow.png";

const PlayGame = (props) => {
  const navigate = useNavigate();
  const { id, opponent } = useParams();
  var [game, setGame] = React.useState();
  var [board, setBoard] = React.useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  var [turn, setTurn] = React.useState("X");
  var [disableButton, setDisableButton] = React.useState(true);
  var [editTable, setEditTable] = React.useState(false);

  const handleClick = (e, board, row, col) => {
    e.preventDefault();

    // console.log(board);
    console.log(editTable);

    if (editTable && board[col][row] === "") {
      board[col][row] = turn;
      setBoard(board);
      // console.log(board);
      setEditTable(false);
    }
  };

  const submitMove = (e) => {
    e.preventDefault();

    // console.log(turn);
    axios.patch(`http://localhost:3001/api/updateBoard/${id}/${opponent}`, {
      board: board,
      turn: turn,
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/api/getUsers/${id}`).then((res) => {
      // console.log(res.data);
      var gamee = res.data.games.filter(
        (game) => game.opponent === opponent
      )[0];
      setGame(gamee);

      console.log(gamee.board);
      setBoard(gamee.board);
      // props.setGame(game);

      if (gamee.lastTurn === "X") setTurn("O");
      else if (gamee.lastTurn === "O") setTurn("X");
      else if (gamee.lastTurn === "p") setTurn(gamee.yourPiece); // new game case

      //set the
      if (gamee.lastTurn === gamee.yourPiece) {
        setEditTable(false);
        setDisableButton(true);
      } else {
        setEditTable(true);
        setDisableButton(false);
      }
    });
  }, []);

  return (
    <Paper className="App" elevation={10}>
      <NavBar>
        <img
          src={backArrow}
          alt="backButton"
          onClick={() => navigate(`/user/${id}`)}
        />
      </NavBar>
      {game ? (
        <div style={{ textAlign: "left", margin: "1.5rem" }}>
          <h2
            style={{
              marginBottom: "0.2rem",
              textAlign: "left",
            }}
          >
            Game with {game.opponent}
          </h2>
          <h5>Your Piece</h5>
          {
            <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              {game.yourPiece}
            </p>
          }
          <div
            style={{
              backgroundColor: "#FFE79E",
              color: "black",
              height: "3rem",
              textAlign: "center",
              padding: "0.7rem",
            }}
          >
            <p>
              {game.lastTurn === game.yourPiece ? (
                <b>Their move</b>
              ) : (
                <b>Your move</b>
              )}
            </p>
          </div>
          <div className="tic-tac-toe">
            {board.map((row, j) => {
              return (
                <div key={uuid()} className="row">
                  {row.map((col, i) => {
                    return (
                      <div
                        key={uuid()}
                        className="col"
                        onClick={(e) => handleClick(e, board, i, j)}
                      >
                        <p style={{ fontSize: "2rem" }}>{col}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <Button
            sx={{
              position: "relative",
              top: "1rem",
              width: "18rem",
              backgroundColor: "#F2C94C",
              color: "white",
            }}
            varient="contained"
            disabled={disableButton}
            onClick={submitMove}
          >
            Submit
          </Button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </Paper>
  );
};

const NavBar = styled.div`
  display: flex;
  align-items: flex-start;
  height: 20px;
  width: 20px;
  margin-bottom: 1rem;
  img {
    margin: 1rem;
    cursor: pointer;
  }
`;

export default PlayGame;

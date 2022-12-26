import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Paper, Box, Button } from "@mui/material";
import styled from "styled-components";
import axios from "axios";

import backArrow from "../assets/images/backArrow.png";

const CreateGame = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [email, setEmail] = React.useState("");
  const [opponent, setOpponent] = React.useState();
  const [userData, setUserData] = React.useState();

  const CreateGameData = (user, val) => {
    var piece = "X";

    if (val === "opponent") piece = "O";

    // opponent data is being pushed in user's games array
    if (val === "opponent") {
      axios.patch(`http://localhost:3001/api/createGame/${user.userName}`, {
        opponent: userData,
        opponentPiece: piece,
      });
    } else if (val === "player") {
      axios.patch(`http://localhost:3001/api/createGame/${id}`, {
        opponent: userData,
        opponentPiece: piece,
      });
    }
  };

  const handleStartGame = () => {
    //getting data of users whose email is entered
    axios.get(`http://localhost:3001/api/getUsers1/${email}`).then((res) => {
      // console.log(res.data);
      setOpponent(res.data);

      CreateGameData(res.data, "opponent"); //email id person data
    });

    axios.get(`http://localhost:3001/api/getUsers/${id}`).then((res) => {
      // console.log(res.data);
      setUserData(res.data);

      CreateGameData(res.data, "player"); // data of person who create the game
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/api/getUsers/${id}`).then((res) => {
      console.log(res.data);
      setUserData(res.data);
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
      <div style={{ margin: "3.5rem 1.4rem", textAlign: "left" }}>
        <h5>Start a new game</h5>
        <h2 style={{ marginBottom: "2rem" }}>Whom do you want to play with?</h2>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            margin: "0.5rem 0",
          }}
        >
          <label>Email</label>
          <Input
            type="text"
            id="email"
            placeholder="Type your email here"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Button
          sx={{
            position: "relative",
            top: "20rem",
            width: "18rem",
            backgroundColor: "#F2C94C",
            color: "white",
          }}
          varient="contained"
          onClick={handleStartGame}
        >
          Start Game
        </Button>
      </div>
    </Paper>
  );
};

const Input = styled.input`
  height: 3rem;
  width: 16rem;
  border-radius: 0.3rem;
  border: none;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #f4f4f4;
`;

const NavBar = styled.div`
  display: flex;
  align-items: flex-start;
  height: 20px;
  width: 20px;
  img {
    margin: 1rem 2rem;
    cursor: pointer;
  }
`;

export default CreateGame;

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Paper, Button } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { v4 as uuid } from "uuid";

import NoGameFoundPage from "../components/NoGameFoundPage";
import Card from "../components/Card";

const Dashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  var [games, setGames] = React.useState(undefined);
  var [userData, setUserData] = React.useState();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/getUsers/${id}`).then((res) => {
      // console.log(res.data);
      setUserData(res.data);
      // console.log(res.data);

      if (res.data.games.length > 0) setGames(res.data.games);
    });
  }, []);

  return (
    <Paper className="App" elevation={10}>
      {games ? (
        <div
          style={{
            height: "40rem",
            overflowY: "scroll",
            overflowX: "hidden",
            padding: "0 0.6rem",
            scrollbarWidth: "none",
            zIndex: 0,
          }}
        >
          <h1 style={{ padding: "1rem", textAlign: "left" }}>Your Games</h1>
          {games && games.map((game) => {
            return <Card userId={id} game={game} key={uuid()} />;
          })}
          <Button
            sx={{
              position: "relative",
              backgroundColor: "#270F36",
              color: "white",
              top: "20rem",
              left: "5rem",
              marginRight: 0,
              zIndex: 1,
              ":hover": {
                backgroundColor: "#270F36",
              },
            }}
            varient="outlined"
            onClick={() => navigate(`/user/${id}/create`)}
          >
            + Create Game
          </Button>
        </div>
      ) : (
        <NoGameFoundPage />
      )}
    </Paper>
  );
};

export default Dashboard;

// {game.lastTurn === 0 ? (
//   <h3>Waiting for opponent to make a move</h3>
// ) : (
//   <h3>It's your turn</h3>
// )}

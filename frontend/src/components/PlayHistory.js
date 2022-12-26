import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Box, FormControl, Button } from "@mui/material";
import styled from "styled-components";

const PlayHistory = (props) => {
  return (
    <Paper className="App" elevation={10}>
      <h1>Your Games</h1>
      {props.user.games.map((game) => {
        return (
          <Paper
            sx={{
              minHeight: 150,
              width: 290,
              margin: "10px",
              padding: "10px",
              borderRadius: "10px",
            }}
            elevation={12}
          >
            <h1>{game.opponent}</h1>
          </Paper>
        );
      })}
    </Paper>
  );
};

export default PlayHistory;

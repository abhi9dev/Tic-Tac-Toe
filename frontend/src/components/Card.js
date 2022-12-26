import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";

import { v4 as uuid } from "uuid";

const Card = (props) => {
  var navigate = useNavigate();

  return (
    <Paper
      sx={{
        height: 170,
        width: 290,
        margin: "10px",
        padding: "10px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      elevation={12}
    >
      <h3 style={{}}>Game with {props.game.opponent}</h3>
      {props.game.lastTurn === 0 ? (
        <div
          style={{
            padding: "1rem 0",
            textAlign: "left",
          }}
        >
          <h5>You've made your move!</h5>
          <h5>Waiting for them.</h5>
        </div>
      ) : (
        <>
          <h5>{props.game.opponent} just made their move!</h5>
          <h5>It's your turn to play now.</h5>
        </>
      )}
      <h5>{props.game.lastMove.toString()}</h5>
      <Button
        sx={{
          height: "2rem",
          width: "16.5rem",
          color: "white",
          marginTop: "0.5rem",
          backgroundColor: "#F2C94C",
        }}
        varient="contained"
        onClick={() =>
          navigate(`/user/${props.userId}/play/${props.game.opponent}`)
        }
      >
        Play!
      </Button>
    </Paper>
  );
};

export default Card;

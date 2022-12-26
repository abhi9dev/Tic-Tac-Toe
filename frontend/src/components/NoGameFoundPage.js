import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";

const NoGameFoundPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <h1
        style={{ paddingTop: "2rem", textAlign: "left", paddingLeft: "2rem" }}
      >
        Your Games
      </h1>
      <Tag
        style={{
          paddingTop: "13rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        No Games Found
      </Tag>
      <Button
        sx={{
          position: "relative",
          top: "1rem",
          width: "18rem",
          height: "3rem",
          backgroundColor: "#F2C94C",
          color: "white",
          borderRadius: "0.4rem",
          ":hover": {
            backgroundColor: "#F2C94C",
          },
        }}
        varient="contained"
        onClick={() => navigate(`/user/${id}/create`)}
      >
        Start Game
      </Button>
    </div>
  );
};

const Tag = styled.h1`
  font-family: "Bilbo Swash Caps", cursive;
`;

export default NoGameFoundPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Box, Button } from "@mui/material";
import styled from "styled-components";

const Register = () => {
  const navigate = useNavigate();

  const directToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const directToRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <Paperr className="App" elevation={10}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 300,
        }}
      >
        <h2>async</h2>
        <h1 style={{ fontSize: "3.5rem" }}>tic tac toe</h1>
      </Box>
      <Box>
        <Button
          sx={{ minWidth: 263, backgroundColor: "#F2C94C", fontSize: "1rem" }}
          variant="contained"
          onClick={directToLogin}
        >
          LogIn
        </Button>
        <Button
          sx={{ minWidth: 263, marginTop: 2 }}
          variant="contained"
          onClick={directToRegister}
        >
          Register
        </Button>
      </Box>
    </Paperr>
  );
};

const Paperr = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Register;

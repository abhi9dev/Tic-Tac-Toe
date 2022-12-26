import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Box, FormControl, Button } from "@mui/material";
import styled from "styled-components";
import hash from "hash.js";

import backArrow from "../assets/images/backArrow.png";
import axios from "axios";

const Register = () => {
  const [name, setName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  var [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const hashedPass = hash.sha256().update(password).digest("hex");

    // axios.get(`http://localhost:3001/api/getUsers/${userName}`).then((res) => {
    //   if (res.data.userName !== undefined) {
    //     setMessage("Username already exists");
    //     setShowMessage(true);
    //     return;
    //   }
    // });

    // axios.get(`http://localhost:3001/api/getUsers1/${email}`).then((res) => {
    //   if (res.data.email !== undefined) {
    //     setMessage("Email already exists");
    //     setShowMessage(true);
    //     return;
    //   }
    // });

    axios
      .post("http://localhost:3001/api/registerUser", {
        name: name,
        email: email,
        userName: userName,
        hashPass: hashedPass,
        games: [],
      })
      .then((res) => {
        setMessage(res.data);
        setShowMessage(true);
      });
  };

  return (
    <Paper className="App" elevation={10}>
      <NavBar>
        <img src={backArrow} alt="backButton" onClick={() => navigate("/")} />
      </NavBar>
      <Box
        sx={{
          height: 600,
          width: 300,
          border: "1px",
          borderColor: "black",
          textAlign: "left",
          padding: "1rem 2rem",
        }}
      >
        <p style={{ padding: 0, margin: 0 }}>Create account</p>
        <h2 style={{ margin: 0, padding: 0 }}>Let's get to know you better!</h2>
        <FormControl>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              margin: "0.5rem 0",
            }}
          >
            <label>Your Name</label>
            <Input
              type="text"
              id="name"
              placeholder="Type your name here"
              onChange={(e) => setName(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              margin: "0.5rem 0",
            }}
          >
            <label>Username</label>
            <Input
              type="text"
              id="userName"
              placeholder="Type your username here"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Box>

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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              margin: "0.5rem 0",
            }}
          >
            <label>Password</label>
            <Input
              type="text"
              id="password"
              placeholder="Type your password here"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box>
            {showMessage && (
              <DisMessage>
                <p>{message}</p>
              </DisMessage>
            )}

            <Button
              sx={{ width: 263, marginTop: 1, backgroundColor: "#F2C94C" }}
              variant="contained"
              type="submit"
              disable={name && userName && email && password ? false : true}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Paper>
  );
};

const Input = styled.input`
  height: 2.5rem;
  width: 15rem;
  border-radius: 0.3rem;
  border: none;
  margin: 0.5rem 0;
  padding: 0.3rem;
  font-size: 1rem;
  background-color: #f4f4f4;
`;

const NavBar = styled.div`
  display: flex;
  align-items: flex-start;
  height: 20px;
  width: 20px;
  margin-bottom: 1rem;
  img {
    margin: 1rem 2rem;
    cursor: pointer;
  }
`;

const DisMessage = styled.div`
  height: 3rem;
  width: 16rem;
  background-color: #6fcf97;
  border-radius: 0.4rem;
  /* border: none; */
  padding: 0.2rem;
  color: white;
`;

export default Register;

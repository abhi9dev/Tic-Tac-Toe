import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Box, FormControl, Button } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import hash from "hash.js";

import backArrow from "../assets/images/backArrow.png";

const Login = () => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);

  const navigate = useNavigate();

  // const hashed = hash.sha256().update("123456").digest("hex");
  // console.log(hashed);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get("http://localhost:3001/api/getUsers").then((res) => {
      var usersData = res.data;
      // console.log(usersData);

      usersData.map((obj) => {
        if (userName === obj.userName) {
          var hashed = hash.sha256().update(password).digest("hex");
          // console.log(hashed, obj.hashPass);
          if (hashed == obj.hashPass) {
            var strr = `/user/${obj.userName}`;
            navigate(strr);
          } else {
            setShowMessage(true);
          }
        } else {
          setShowMessage(true);
        }
      });
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
        <h4>Create account</h4>
        <h2>Let's get to know you better!</h2>
        <FormControll>
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
            <label>Password</label>
            <Input
              type="password"
              id="password"
              placeholder="Type your password here"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box>
            {showMessage && (
              <DisMessage>
                <p>Enter correct details.</p>
              </DisMessage>
            )}

            <Button
              sx={{ minWidth: 263, marginTop: 1, backgroundColor: "#F2C94C" }}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              LogIn
            </Button>
          </Box>
        </FormControll>
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
  img {
    margin: 1rem 2rem;
    cursor: pointer;
  }
`;

const DisMessage = styled.div`
  height: 3rem;
  width: 16rem;
  background-color: #eb5757;
  border-radius: 0.4rem;
  /* border: none; */
  padding: 0.2rem;
  color: white;
`;

const FormControll = styled(FormControl)`
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  /* & :last-child {
    
  } */
`;

export default Login;

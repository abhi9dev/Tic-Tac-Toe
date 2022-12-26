import "./App.css";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateGame from "./pages/CreateGame";
import PlayGame from "./pages/PlayGame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/user/:id" element={<Dashboard />} />
      <Route path="/user/:id/create" element={<CreateGame />} />
      <Route path="/user/:id/play/:opponent" element={<PlayGame />} />
    </Routes>
  );
}

export default App;

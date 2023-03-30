import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  FormGroup,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PostWithAuth } from "../../services/HttpService";
import { useState } from "react";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleUsername = (value) => {
    setUsername(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleButton = (path) => {
    sendRequest(path);
    setUsername("");
    setPassword("");
    navigate("/");
  };

  const sendRequest = (path) => {
    PostWithAuth("/auth/" + path, {
      userName: username,
      password: password,
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.message);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
      })
      .catch((err) => console.log(err));
  };
  return (
    <FormControl style={{ top: 20 }}>
      <FormGroup>
        <InputLabel>Username</InputLabel>
        <Input onChange={(i) => handleUsername(i.target.value)}></Input>
      </FormGroup>
      <FormGroup>
        <InputLabel style={{ top: 80 }}>Password</InputLabel>
        <Input
          onChange={(i) => handlePassword(i.target.value)}
          style={{ top: 40 }}
        ></Input>
      </FormGroup>
      <Button
        variant="contained"
        style={{ marginTop: 60 }}
        onClick={() => handleButton("register")}
      >
        Register
      </Button>
      <FormHelperText style={{ marginTop: 30 }}>
        Are you already registered?
      </FormHelperText>
      <Button
        variant="contained"
        style={{ marginTop: 10 }}
        onClick={() => handleButton("login")}
      >
        Login
      </Button>
    </FormControl>
  );
}

export default Auth;

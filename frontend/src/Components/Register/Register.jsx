import { Avatar, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, password, avatar);
  };
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <Avatar
          src={avatar}
          alt="user"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Enter your name"
          className="registerInputs"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="enter your email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="enter your passowrd"
          className="registerInputs"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/forgot/password">
          <Typography>Forgot Password</Typography>
        </Link>
        <Link to="/login">
          <Typography>Existing User</Typography>
        </Link>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;

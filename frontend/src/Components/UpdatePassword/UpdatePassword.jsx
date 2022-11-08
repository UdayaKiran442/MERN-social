import React from "react";
import "./UpdatePassword.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/user";

import "react-toastify/dist/ReactToastify.css";
const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.like);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
  };

  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <input
          type="password"
          placeholder="enter your old password"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="updatePasswordInputs"
        />
        <input
          type="password"
          placeholder="enter your new passowrd"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="updatePasswordInputs"
        />
        <Link to="/account">
          <Typography>Back</Typography>
        </Link>
        <Button type="submit" disabled={loading}>
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;

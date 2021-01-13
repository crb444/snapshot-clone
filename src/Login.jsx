import React, { useState } from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useDispatch } from "react-redux";
import { saveUser } from "./features/appData/appSlice";

function Login() {
  const dispatch = useDispatch();

  const login = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch(
          saveUser({
            userName: result.user.displayName,
            profileUrl: result.user.photoURL,
          })
        )
      )
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <img
        className="login__logo"
        src="https://variety.com/wp-content/uploads/2017/11/snapchat-logo.jpg"
      />
      <Button onClick={login}>Login</Button>
    </div>
  );
}

export default Login;

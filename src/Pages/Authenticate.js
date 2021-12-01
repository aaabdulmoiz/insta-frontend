import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import HomePage from "./HomePage";

function Authenticate() {
  const { auth } = useSelector((state) => state.authenticate);

  if (auth === undefined) {
    return <Register />;
  } else if (auth === false) {
    return <Login />;
  } else {
    return <HomePage />;
  }
}

export default Authenticate;

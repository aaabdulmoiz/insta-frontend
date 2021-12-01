import {
  Stack,
  Box,
  TextField,
  Button,
  Container,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AlertBox from "../Components/AlertBox";
import { useSelector, useDispatch } from "react-redux";
import { registerAsync, authMessage } from "../redux/auth";
import Colors from "../Constants/Colors";
import NavBar from "../Components/NavBar";

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { message, isError } = useSelector((state) => state.authenticate);
  const dispatch = useDispatch();

  const signUp = async () => {
    if (!(registerInfo.name && registerInfo.email && registerInfo.password)) {
      return dispatch(authMessage("Please fill the fields."));
    }
    dispatch(registerAsync(registerInfo));
  };
  return (
    <div>
      <NavBar />
      <h2 style={{ color: Colors.text }}>Register Page</h2>
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          //   component="form"
          sx={{
            "& > :not(style)": { width: "28ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={2}>
            {message && (
              <AlertBox type={isError ? "error" : "success"}>
                {message}
              </AlertBox>
            )}
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              size="small"
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, name: e.target.value })
              }
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              size="small"
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, email: e.target.value })
              }
            />
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              size="small"
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, password: e.target.value })
              }
            />
            <div>
              <Button
                disableElevation
                variant="contained"
                style={{ backgroundColor: Colors.primary, color: "#FFFFFF" }}
                onClick={signUp}
              >
                Register
              </Button>
            </div>
          </Stack>
        </Box>
      </div>
    </div>
  );
}

export default Register;

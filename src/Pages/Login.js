import { Stack, Box, TextField, Button, Container } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../Constants/Colors";
import AlertBox from "../Components/AlertBox";
import NavBar from "../Components/NavBar";
import { authMessage, loginAsync } from "../redux/auth";

function Login() {
  const { message } = useSelector((state) => state.authenticate);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const loginUser = async () => {
    console.log("here in loginUser");
    if (!(loginInfo.email && loginInfo.password)) {
      return dispatch(authMessage("Please enter the fields."));
    }
    dispatch(loginAsync(loginInfo));
  };

  return (
    <div>
      <NavBar />
      <h2 style={{ color: Colors.text }}>Login Page</h2>
      {/* <p>The count is: {count}</p> */}
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
            {message && <AlertBox>{message}</AlertBox>}
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              size="small"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, email: e.target.value })
              }
            />
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              size="small"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
            <div>
              <Button
                disableElevation
                variant="contained"
                style={{ backgroundColor: Colors.primary, color: "#FFFFFF" }}
                onClick={loginUser}
              >
                Login
              </Button>
            </div>
          </Stack>
        </Box>
      </div>
    </div>
  );
}

export default Login;

// const { email, password } = loginInfo;
// console.log("email is ", email);
// try {
//   const loginUser = await authenticate.signInWithEmailAndPassword(
//     loginInfo.email,
//     loginInfo.password
//   );
//   if (loginUser) {
//     dispatch(profileSave(loginInfo));
//     dispatch(login());
//   }
// } catch (error) {
//   alert(error.message);
// }

// try {
//   const url = "http://localhost:5000/api/user/login";
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//   });
//   const data = await response.json();
//   console.log(data);
// } catch (err) {
//   console.log(err);
// }

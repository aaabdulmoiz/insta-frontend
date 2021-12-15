import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Colors from "../Constants/Colors";
import CssBaseline from "@mui/material/CssBaseline";
import { Hidden } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { login, logout, register } from "../redux/auth";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";

export default function NavBar() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.authenticate);
  const history = useHistory();

  const logoutUser = async () => {
    try {
      console.log("in logout");
      const url = "http://localhost:5000/api/user/logout";
      const response = await fetch(url, {
        method: "POST",
      });
      const res = await response.json();
      dispatch(logout());
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigateToRegister = () => {
    dispatch(register());
    history.push("/");
  };
  const navigateToLogin = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position="static" style={{ backgroundColor: Colors.primary }}>
          <Toolbar>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <IconButton
                    variant="contained"
                    disableElevation
                    {...bindTrigger(popupState)}
                    style={{ backgroundColor: Colors.primary }}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>Profile</MenuItem>
                    <MenuItem onClick={popupState.close}>Messages</MenuItem>
                    <MenuItem onClick={popupState.close}>Friends</MenuItem>
                    <MenuItem onClick={popupState.close}>Settings</MenuItem>
                    <MenuItem onClick={popupState.close}>Privacy</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Instagram
            </Typography>
            {auth && (
              <Link to="/">
                <Button
                  variant="contained"
                  color="secondary"
                  disableElevation
                  style={{ backgroundColor: Colors.primary }}
                >
                  Home
                </Button>
              </Link>
            )}
            {auth && (
              <Link to="/feed">
                <Button
                  variant="contained"
                  color="secondary"
                  disableElevation
                  style={{ backgroundColor: Colors.primary }}
                >
                  Feed
                </Button>
              </Link>
            )}
            {!auth && (
              <Button
                onClick={navigateToLogin}
                variant="contained"
                color="secondary"
                disableElevation
                style={{ backgroundColor: Colors.primary }}
              >
                Login
              </Button>
            )}
            {!auth && (
              <Button
                onClick={navigateToRegister}
                variant="contained"
                color="secondary"
                disableElevation
                style={{ backgroundColor: Colors.primary }}
              >
                Register
              </Button>
            )}

            {auth && (
              <Button
                onClick={logoutUser}
                variant="contained"
                color="secondary"
                disableElevation
                style={{ backgroundColor: Colors.primary }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

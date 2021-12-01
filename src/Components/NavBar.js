import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { pink } from "@mui/material/colors";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Colors from "../Constants/Colors";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { login, logout, register } from "../redux/auth";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth as authenicate } from "../firebase";
import { makeStyles } from "@mui/styles";

export default function NavBar() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.authenticate);
  const history = useHistory();

  const logoutUser = async () => {
    try {
      const logOut = await authenicate.signOut();
      dispatch(logout());
      history.push("/");
    } catch (error) {
      alert(error.message);
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
            <IconButton
              size="large"
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

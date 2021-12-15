import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuItem, Menu } from "@mui/material";
import Colors from "../Constants/Colors";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

function ChatBar({ users, recepient, setRecepientProfile }) {
  return (
    <>
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
                  {users.map((user) => (
                    <MenuItem
                      key={user._id}
                      onClick={() => {
                        setRecepientProfile(user);
                        popupState.close();
                      }}
                    >
                      {user.name}
                    </MenuItem>
                  ))}
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {recepient ? recepient.name : "Chat"}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default ChatBar;

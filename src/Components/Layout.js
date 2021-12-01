import React from "react";
// import { makeStyles, useTheme } from "@mui/styles";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Drawer, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Hidden } from "@mui/material";
import { Box } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  page: {
    background: "#f9f9g5",
    width: "100%",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    width: drawerWidth,
    background: "#ECECEC",
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#ECECEC",
  },
  root: {
    display: "flex",
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  return (
    <div className={classes.root}>
      {/* app bar */}
      {/* Sidebar */}
      <Hidden smDown implementation="css">
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <InstagramIcon style={{ alignSelf: "center" }} fontSize="large" />
            </div>
          </Toolbar>
          <Box sx={{ overflow: "auto" }}>
            <List>
              {["Profile", "Messages", "Friends"].map((text, index) => (
                <ListItem
                  button
                  key={text}
                  onClick={() =>
                    history.push({
                      pathname: `/${text.toLowerCase()}`,
                      title: text,
                    })
                  }
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {["Settings", "Privacy"].map((text, index) => (
                <ListItem
                  button
                  key={text}
                  onClick={() =>
                    history.push({
                      pathname: `/${text.toLowerCase()}`,
                      title: text,
                    })
                  }
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Hidden>
      <div className={classes.page}>{children}</div>
    </div>
  );
}

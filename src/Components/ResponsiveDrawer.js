import React from "react";
// import { makeStyles, useTheme } from "@mui/styles";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Drawer, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

// const drawerWidth = 240;

// const useStyles = makeStyles({
//   page: {
//     background: "#f9f9f6",
//     width: "100%",
//   },
//   drawer: {
//     width: drawerWidth,
//     background: "#ECECEC",
//   },
//   drawerPaper: {
//     width: drawerWidth,
//     background: "#ECECEC",
//   },
//   root: {
//     display: "flex",
//   },
// });

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
  page: {
    background: "#f9f9f6",
    width: "100%",
  },
}));

export default function ResponsiveDrawer({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const drawer = (
    <div>
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
          {["Profile", "Messages", "Friends", "Archive"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Account Settings", "Privacy", "Suggestions"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
  return (
    <div className={classes.root}>
      {/* app bar */}
      {/* Sidebar */}
      <CssBaseline />
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.page}>{children}</div>
    </div>
  );
}

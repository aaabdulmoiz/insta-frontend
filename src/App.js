import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Authenticate from "./Pages/Authenticate";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { pink } from "@mui/material/colors";
import Feed from "./Pages/Feed";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import Privacy from "./Pages/Privacy";
import Messages from "./Pages/Messages";
import Friends from "./Pages/Friends";

const theme = createTheme({
  palette: {
    primary: { main: "#000", contrastText: "#000000" },
    secondary: pink,
  },
  typography: {
    useNextVariants: true,
  },
});

function App() {
  const { auth } = useSelector((state) => state.authenticate);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Authenticate} exact />
            <Route path="/feed" component={Feed} />
            <Route path="/profile" component={Profile} />
            <Route path="/messages" component={Messages} />
            <Route path="/friends" component={Friends} />
            <Route path="/settings" component={Settings} />
            <Route path="/privacy" component={Privacy} />
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

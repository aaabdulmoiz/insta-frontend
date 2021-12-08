import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./Components/PrivateRoute";
import Authenticate from "./Pages/Authenticate";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { pink } from "@mui/material/colors";
import Feed from "./Pages/Feed";
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
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Authenticate} exact />
            <PrivateRoute path="/feed" component={Feed} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/messages" component={Messages} />
            <PrivateRoute path="/friends" component={Friends} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/privacy" component={Privacy} />
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

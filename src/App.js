import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Pages
import facts from "./Pages/Facts";
import home from "./Pages/Home";
import search from "./Pages/Search";

// Components
import Navbar from "./Components/Navbar";

const theme = createMuiTheme({
  spread: {
    palette: {
      primary: {
        500: blue[500],
      },
      common: {
        black: "#000",
        white: "#fff",
      },
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/facts" component={facts} />
                <Route path="/search/:q?" component={search} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;

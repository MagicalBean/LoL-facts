import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import { Typography } from "@material-ui/core";

export class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Typography variant="h1" component="h1" align="center">
          Home
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          style={{ marginTop: 20 }}
          align="center"
        >
          Go to "Explore" or "Search" to find all the LoL fun facts
        </Typography>
      </div>
    );
  }
}

export default Home;

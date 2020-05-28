import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import { Typography } from "@material-ui/core";

export class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Typography variant="h2" component="h1" align="center">
          Home
        </Typography>
      </div>
    );
  }
}

export default Home;

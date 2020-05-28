// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
} from "@material-ui/core";
// Redux
import { connect } from "react-redux";
import ChampionChips from "./ChampionChips";

const styles = (theme) => ({
  ...theme.spread,
  root: {
    maxWidth: "80vh", //465
    margin: "50px auto 0 auto",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  fact: {
    display: "flex",
    height: 72,
    alignItems: "center",
    paddingTop: 16,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  popover: {
    maxWidth: 200,
    textAlign: "center",
  },
});

class RandomCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  changeIndex = (num) => (event) => {
    this.setState((state) => {
      if (state.index + num >= 40) return { index: 0 };
      if (state.index + num <= 0) return { index: 39 };
      return { index: state.index + num };
    });
  };

  setIndex = (num) => {
    if (num <= 0) num = 0;
    if (num >= 39) num = 39;

    this.setState((state) => {
      return { index: num };
    });
  };

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  render() {
    const { classes, facts } = this.props;

    let markup =
      facts.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <Card className={classes.root}>
          <CardContent>
            <Grid container>
              <Grid item align="left" xs={4}>
                {facts[this.state.index].categories.map((cat) => {
                  return (
                    <Chip
                      key={this.getRandomInt(0, 10000)}
                      label={cat}
                      className={classes.chip}
                      size="small"
                      clickable
                      onClick={(event) => {
                        this.props.history.push(
                          `/search/cat:${cat.toLowerCase()}`
                        );
                      }}
                    />
                  );
                })}
              </Grid>
              <Grid item align="center" xs={4}>
                <Typography variant="h5" component="h2">
                  Fact #{facts[this.state.index].id}
                </Typography>
              </Grid>
              <Grid item align="right" xs={4}>
                <ChampionChips index={this.state.index} />
              </Grid>
              <Grid item>
                <Typography className={classes.fact}>
                  {facts[this.state.index].fact}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid alignItems="baseline" justify="space-between" container>
              <Grid item align="left" xs={4}>
                <Button size="small" onClick={this.changeIndex(-1)}>
                  Previous Fact
                </Button>
              </Grid>
              <Grid item align="center" xs={4}>
                <Button
                  size="small"
                  onClick={() => {
                    const num = this.getRandomInt(0, facts.length - 1);
                    if (num !== this.state.index) {
                      this.setIndex(num);
                    } else {
                      this.setIndex(this.getRandomInt(0, facts.length - 1));
                    }
                  }}
                >
                  Random Fact
                </Button>
              </Grid>
              <Grid item align="right" xs={4}>
                <Button size="small" onClick={this.changeIndex(1)}>
                  Next Fact
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      );

    return markup;
  }
}

const mapStateToProps = (state) => ({
  facts: state.dataReducer.facts,
});

RandomCard.propTypes = {
  facts: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(RandomCard))
);

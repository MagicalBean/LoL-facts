import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Chip } from "@material-ui/core";
import { connect } from "react-redux";
import ChampionChips from "./ChampionChips";

const styles = (theme) => ({
  ...theme.spread,
  root: {
    maxWidth: "60vh", //465
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
  none_found: {
    marginTop: 40,
    textAlign: "center",
  },
});

class SearchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  render() {
    const { facts, classes, indices } = this.props;

    let markup;

    let currentFact;

    if (indices.length > 0) {
      markup = indices.map((index) => {
        currentFact = facts[index - 1];
        return (
          <Card key={this.getRandomInt(0, 1000000)} className={classes.root}>
            <CardContent>
              <Grid container>
                <Grid item align="left" xs={4}>
                  {currentFact.categories.map((cat) => {
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
                    Fact #{currentFact.id}
                  </Typography>
                </Grid>
                <Grid item align="right" xs={4}>
                  {currentFact.champions}
                  <ChampionChips index={index - 1} />
                </Grid>
                <Grid item>
                  <Typography className={classes.fact}>
                    {currentFact.fact}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      });
    } else {
      markup = (
        <Typography component="h2" variant="h4" className={classes.none_found}>
          No facts found... try searching something else
        </Typography>
      );
    }

    return markup;
  }
}

const mapStateToProps = (state) => ({
  facts: state.dataReducer.facts,
  indices: state.dataReducer.indices,
});

SearchCard.propTypes = {
  indicies: PropTypes.array,
  facts: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(SearchCard))
);

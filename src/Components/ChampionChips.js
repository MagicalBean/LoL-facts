import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { Button, Popover, Chip } from "@material-ui/core";
import { connect } from "react-redux";
import { setIndex } from "../Redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spread,
  chip: {
    margin: theme.spacing(0.5),
  },
  popover: {
    maxWidth: 200,
    textAlign: "center",
  },
});

class ChampionChips extends Component {
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    const { facts, classes, index } = this.props;

    let i = index - 1;

    // console.log();

    return (
      <PopupState variant="popover" popupId="champs-popover">
        {(popupState) => (
          <div>
            <Button {...bindTrigger(popupState)}>Characters</Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              className={classes.popover}
            >
              {facts[i].characters.map((champ) => {
                return (
                  <Chip
                    key={this.getRandomInt(0, 10000)}
                    className={classes.chip}
                    size="small"
                    label={champ}
                    clickable
                    onClick={(event) => {
                      this.props.history.push(
                        `/search/champ:${champ.toLowerCase()}`
                      );
                    }}
                  />
                );
              })}
            </Popover>
          </div>
        )}
      </PopupState>
    );
  }
}

const mapStateToProps = (state) => ({
  facts: state.dataReducer.facts,
});

ChampionChips.propTypes = {
  facts: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  setIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default withRouter(
  connect(mapStateToProps, { setIndex })(withStyles(styles)(ChampionChips))
);

import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { fade } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import {
  Card,
  CardContent,
  Typography,
  InputBase,
  FormHelperText,
} from "@material-ui/core";
import { connect } from "react-redux";
import { setIndices } from "../Redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spread,
  root: {
    maxWidth: "60vh", //465
    margin: "50px auto 0 auto",
    flexGrow: 1,
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    marginBottom: 10,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    paddingRight: `1em`,
    width: "100%",
  },
});

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      update: false,
    };
  }

  setQuery = (query) => {
    this.setState((state) => {
      return { query: query };
    });
  };

  componentDidUpdate(prevProps) {
    let q = this.props.match.params.q;
    if (q) {
      if (this.state.query !== q) {
        this.setState((state) => {
          return {
            query: q ? q : "",
            update: true,
          };
        });
        this.searchSwitch(q ? q : "");
      }
    }
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  handleChange = (event) => {
    this.searchSwitch(event.target.value);
  };

  searchSwitch = (value) => {
    if (value.indexOf(":") !== -1) {
      if (value.split(":")[0] === "champ") {
        this.searchChamps(value);
      } else if (value.split(":")[0] === "cat") {
        this.searchCats(value);
      }
    } else {
      this.generalSearch(value);
    }
    this.setState({ update: false });
  };

  searchChamps = (value) => {
    const found = this.props.facts.filter((el) =>
      el.characters.includes(this.capitalizeFirstLetter(value.split(":")[1]))
    );

    this.setFoundFacts(found);
  };

  searchCats = (value) => {
    const found = this.props.facts.filter((el) =>
      el.categories.includes(value.split(":")[1].toLowerCase())
    );

    this.setFoundFacts(found);
  };

  generalSearch = (value) => {
    const found = this.props.facts.filter((el) =>
      el.fact.toLowerCase().includes(value.toLowerCase())
    );

    this.setFoundFacts(found);
  };

  setFoundFacts = (found) => {
    const indices = [];
    if (found.length > 0 && found[0].id !== 0 && found[0].id - 1 !== -1) {
      found.forEach((el) => indices.push(el.id));
      this.props.setIndices(indices);
    } else {
      this.props.setIndices(indices);
    }
  };

  render() {
    const { classes } = this.props;

    return (this.state.query && this.props.match.params.q) ||
      !this.props.match.params.q ? (
      <Card className={classes.root}>
        <CardContent>
          <Typography align="center" variant="h5" component="h2" gutterBottom>
            Search
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              defaultValue={this.state.query}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={this.handleChange}
            />
          </div>
          <FormHelperText>
            Use "champ:" or "cat:" to search by those filters
          </FormHelperText>
        </CardContent>
      </Card>
    ) : (
      <Typography component="h2" variant="h4">
        Loading...
      </Typography>
    );
  }
}

const mapStateToProps = (state) => ({
  facts: state.dataReducer.facts,
  index: state.dataReducer.index,
  indices: state.dataReducer.indices,
});

Searchbar.propTypes = {
  indices: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  facts: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  connect(mapStateToProps, { setIndices })(withStyles(styles)(Searchbar))
);

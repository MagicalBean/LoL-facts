import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFacts } from "../Redux/actions/dataActions";
import Searchbar from "../Components/Searchbar";
import SearchCard from "../Components/SearchCard";

class Search extends Component {
  componentDidMount() {
    this.props.getFacts();
  }

  render() {
    return (
      <div>
        <Searchbar />
        <SearchCard />
      </div>
    );
  }
}

Search.propTypes = {
  getFacts: PropTypes.func.isRequired,
  facts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  facts: state.dataReducer.facts,
  loading: state.dataReducer.loading,
});

export default connect(mapStateToProps, { getFacts })(Search);

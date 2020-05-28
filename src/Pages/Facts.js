// React
import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { getFacts } from "../Redux/actions/dataActions";
// Components
import RandomCard from "../Components/RandomCard";

class Facts extends Component {
  componentDidMount() {
    this.props.getFacts();
  }

  render() {
    const { loading } = this.props;
    return <div>{loading ? <h1>Loading...</h1> : <RandomCard />}</div>;
  }
}

Facts.propTypes = {
  getFacts: PropTypes.func.isRequired,
  facts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  facts: state.dataReducer.facts,
  loading: state.dataReducer.loading,
});

export default connect(mapStateToProps, { getFacts })(Facts);

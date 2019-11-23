import React, { Component } from "react";
import { connect } from "react-redux";

import firebaseService from "../../../../../services/firebase";

export class Show4L extends Component {
  state = {curId:"", curRetro: null };

  componentDidMount = async () => {
    const curId = this.props.match.params.id;
    const res = await firebaseService.getRetroInfo(curId);
    this.setState({...this.state, curId, curRetro: res });
  };

  renderData = () => {
    if (this.state.curRetro) {
      return <div>Nice</div>;
    } else {
      return (
        <React.Fragment>
          <div>
      <h1>Retrospective ID: {this.state.curId} was not found</h1>
          </div>
        </React.Fragment>
      );
    }
  };

  render() {
    return <div>{this.renderData()}</div>;
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {})(Show4L);

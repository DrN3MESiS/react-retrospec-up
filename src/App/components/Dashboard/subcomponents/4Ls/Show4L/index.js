import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import firebaseService from "../../../../../services/firebase";

export class Show4L extends Component {
  state = { curId: "", curRetro: null };

  getData = async () =>{
    const curId = this.props.match.params.id;
    const res = await firebaseService.getRetroInfo(curId);
    this.setState({ ...this.state, curId, curRetro: res });
  }

  componentDidMount = () => {
    this.getData();
  };

  renderLiked = data => {
    return data.map(e => {
      return (
        <li className="list-group-item" key={e}>
          {e}
        </li>
      );
    });
  };

  renderLacked = data => {
    return data.map(e => {
      return (
        <li className="list-group-item" key={e}>
          {e}
        </li>
      );
    });
  };

  renderLonged = data => {
    return data.map(e => {
      return (
        <li className="list-group-item" key={e}>
          {e}
        </li>
      );
    });
  };

  renderLearned = data => {
    return data.map(e => {
      return (
        <li className="list-group-item" key={e}>
          {e}
        </li>
      );
    });
  };

  renderData = () => {
    if (this.state.curRetro) {
      if (this.state.curRetro.editable) {
        const {
          name,
          owner,
          likedData,
          learnedData,
          lackedData,
          longedData,
          type
        } = this.state.curRetro;
        return (
          <React.Fragment>
            <div className="container-fluid">
              <div style={{ textAlign: "center" }}>
                <h1>
                  <i>{name}</i>
                </h1>
                <hr></hr>
                <div>
                  <h5>Retrospective Information:</h5>
                  <h6>Owner: {owner}</h6>
                  <h6>Type: {type}</h6>
                  <Link to="/r/4ls">
                    <input
                      type="button"
                      value="Back"
                      className="btn btn-outline-danger"
                    ></input>
                  </Link>
                </div>
              </div>
              <hr></hr>
              <div className="row">
                <div className="col-sm">
                  <ul className="list-group">
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center active"
                      aria-disabled="true"
                    >
                      Licked
                      <span className="badge badge-danger badge-pill">
                        {likedData.length}
                      </span>
                    </li>
                    {this.renderLiked(likedData)}
                    <li className="list-group-item">
                      <input
                        type="button"
                        className="btn btn-info"
                        style={{ width: "100%" }}
                        value="Add to Licked"
                      ></input>
                    </li>
                  </ul>
                </div>
                <div className="col-sm">
                  <ul className="list-group">
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center active"
                      aria-disabled="true"
                    >
                      Learned
                      <span className="badge badge-danger badge-pill">
                        {learnedData.length}
                      </span>
                    </li>
                    {this.renderLearned(learnedData)}
                    <li className="list-group-item">
                      <input
                        type="button"
                        className="btn btn-info"
                        style={{ width: "100%" }}
                        value="Add to Learned"
                      ></input>
                    </li>
                  </ul>
                </div>
                <div className="col-sm">
                  <ul className="list-group">
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center active"
                      aria-disabled="true"
                    >
                      Lacked
                      <span className="badge badge-danger badge-pill">
                        {lackedData.length}
                      </span>
                    </li>
                    {this.renderLacked(lackedData)}
                    <li className="list-group-item">
                      <input
                        type="button"
                        className="btn btn-info"
                        style={{ width: "100%" }}
                        value="Add to Lacked"
                      ></input>
                    </li>
                  </ul>
                </div>
                <div className="col-sm">
                  <ul className="list-group">
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center active"
                      aria-disabled="true"
                    >
                      Longed For
                      <span className="badge badge-danger badge-pill">
                        {longedData.length}
                      </span>
                    </li>
                    {this.renderLonged(longedData)}
                    <li className="list-group-item">
                      <input
                        type="button"
                        className="btn btn-info"
                        style={{ width: "100%" }}
                        value="Add to Longed For"
                      ></input>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <div className="container">
              <h1>This Retrospective is currently private</h1>
              <hr></hr>
              <h5>Contact the owner to access its data</h5>
            </div>
          </React.Fragment>
        );
      }
    } else if (this.state.curRetro === null) {
      return (
        <React.Fragment>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </React.Fragment>
      );
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

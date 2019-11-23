import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import firebaseService from "../../../../../services/firebase";
import AnswerForm from "./form";

export class Show4L extends Component {
  state = {
    curId: "",
    curRetro: null,
    toEdit: null,
    editing: false,
    editObject: null
  };

  handleSubmit = ({ answer }) => {
    this.getData();
    let data;
    let document = firebaseService.updateRetField(this.state.curId);
    switch (this.state.editObject) {
      case "liked":
          data = this.state.curRetro.likedData;
          data.push(answer);
          document.update({likedData: data});
        break;
      case "learned":
          data = this.state.curRetro.learnedData;
          data.push(answer);
          document.update({learnedData: data});
        break;
      case "lacked":
          data = this.state.curRetro.lackedData;
          data.push(answer);
          document.update({lackedData: data});
        break;
      case "longed":
          data = this.state.curRetro.longedData;
          data.push(answer);
          document.update({longedData: data});
        break;
      default:
        console.error("ERROR GETTING TYPE")
        break;
    }
    
    
    this.setState({...this.state, toEdit: null, editing: false, editObject: null})
    this.getData();
  };

  getData = async () => {
    const curId = this.props.match.params.id;
    firebaseService.getRetroInfo(curId).then(res => {
      this.setState({ ...this.state, curId, curRetro: res });
    });
  };

  componentDidMount = () => {
    firebaseService.init();
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
                  {this.props.auth_status.isSignedIn !== null && (
                    <Link to="/r/4ls">
                      <input
                        type="button"
                        value="Back"
                        className="btn btn-outline-danger"
                      ></input>
                    </Link>
                  )}
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
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            toEdit: "Liked",
                            editing: true,
                            editObject: "liked"
                          });
                        }}
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
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            toEdit: "Learned",
                            editing: true,
                            editObject: "learned"
                          });
                        }}
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
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            toEdit: "Lacked",
                            editing: true,
                            editObject: "lacked"
                          });
                        }}
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
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            toEdit: "Longed For",
                            editing: true,
                            editObject: "longed"
                          });
                        }}
                      ></input>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {this.state.editing ? (
              <React.Fragment>
                <hr></hr>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="card">
                        <div className="card-header">
                          Add item to:{" "}
                          <b>
                            <i>{this.state.toEdit}</i>
                          </b>
                        </div>
                        <div className="card-body">
                          <AnswerForm onSubmit={this.handleSubmit} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <div></div>
            )}
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

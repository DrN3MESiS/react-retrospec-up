import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import firebaseService from "../../../../services/firebase";
import { CHANGE_USER_STATUS } from "../../../../actions";

export class Dash4L extends Component {
  state = { user_ret: [] };

  makePublic = id => {

  }

  deleteRetro = id => {

  }

  componentDidMount = async () => {
    const user = this.props.auth_status.uid;
    await firebaseService.getUserData(user).then(res => {
      this.props.CHANGE_USER_STATUS(res);
    });

    const retros = this.props.auth_status.retros;
    const retros_data = [];
    const promises = retros.map(async e => {
      let eD = await firebaseService.getRetroInfo(e);
      if (eD.type === "4Ls") {
        eD = { ...eD, id: e };
        retros_data.push(eD);
      }
    });

    await Promise.all(promises);
    this.setState({ user_ret: retros_data });
  };

  renderRetrospectives = () => {
    if (this.state.user_ret && this.state.user_ret.length !== 0) {
      const promises = this.state.user_ret.map(e => {
        const { name, editable } = e;

        return (
          <React.Fragment key={name}>
            <li className="list-group-item">
              <div className="card">
                <h5 className="card-header">Restrospective: {name}</h5>
                <div className="card-body">
                  <div>
                    {editable ? (
                      <React.Fragment>
                        <h6>Status: Public</h6>
                        <h6>Retrospective URL: {`/r/4ls/${e.id}`}</h6>
                        <input type="button" value="Make Private"></input>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <h6>Status: Private</h6>
                        <input type="button" value="Make Public"></input>
                      </React.Fragment>
                    )}
                    <hr></hr>
                    <input type="button" className="btn btn-danger" value="D" onClick={this.deleteRetro(e.id)}></input>
                  </div>
                </div>
              </div>
            </li>
          </React.Fragment>
        );
      });
      return promises;
    } else {
      return (
        <li className="list-group-item">
          You haven't created any retrospectives yet!
        </li>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <Link to="/r/4ls/create">
          <input
            type="button"
            className="btn btn-primary"
            value="Create 4L Restrospective"
          ></input>
        </Link>
        <Link to="/">
          <input
            type="button"
            className="btn btn-warning"
            value="Go Back"
          ></input>
        </Link>
        <hr></hr>
        <h1>
          Your 4Ls Retrospectives:
          <span onClick={this.refreshData} className="badge badge-secondary">
            Refresh Data
          </span>
        </h1>
        <ul className="list-group">{this.renderRetrospectives()}</ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { CHANGE_USER_STATUS })(Dash4L);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import firebaseService from "../../../../services/firebase";
import { CHANGE_USER_STATUS } from "../../../../actions";

export class Dash4L extends Component {
  state = { user_ret: [], refreshStatus: false };

  refreshData = async () => {
    this.setState({...this.state, refreshStatus: true})
    const user = this.props.auth_status.uid;
    await firebaseService.getUserData(user).then(res => {
      this.props.CHANGE_USER_STATUS(res);
      this.setState({...this.state, refreshStatus: false, user_ret: this.props.auth_status.retros})
    });
  };

  changeRetroStatus = id => {

  };

  deleteRetro = async id => {
    const user = this.props.auth_status.uid;
    await firebaseService.getUserData(user).then(res => {
      let newData = res;
      const retChange = newData.retros.filter(e => {
        return e !== id;
      });
      newData = { ...newData, retros: retChange };
      firebaseService.updateUserData(newData);
      firebaseService.deleteRet(id);

      this.setState({ user_ret: this.props.auth_status.retros });
    });
  };

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
        const { name, editable, id } = e;

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
                        <h6>Retrospective URL: {`/r/4ls/${id}`}</h6>
                        <input type="button" value="Make Private"></input>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <h6>Status: Private</h6>
                        <input type="button" value="Make Public"></input>
                      </React.Fragment>
                    )}
                    <hr></hr>
                    <input
                      type="button"
                      className="btn btn-danger"
                      value="D"
                      onClick={e => {
                        this.deleteRetro(id);
                      }}
                    ></input>
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
        <h1>Your 4Ls Retrospectives:</h1>
        <button onClick={this.refreshData} className="btn btn-dark" style={{width: '8rem', height: '3rem'}}>
          {this.state.refreshStatus ? (<div className="spinner-border text-light" role="status"></div>) : ("Refresh Data")}
        </button>
        <ul className="list-group">{this.renderRetrospectives()}</ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { CHANGE_USER_STATUS })(Dash4L);

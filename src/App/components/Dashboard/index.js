import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import firebaseService from "../../services/firebase";
import { CHANGE_USER_STATUS } from "../../actions";
import "./style.css";

class Dashboard extends Component {
  handleSignOut = async () => {
    await firebaseService.auth.signOut();
    const firebaseUser = {
      uid: null
    };
    this.props.CHANGE_USER_STATUS(firebaseUser);
  };

  render() {
    return (
      <div className="container">
        <br></br>
        <div class="row align-items-start">
          <div class="col" style={{ textAlign: "center" }}>
            <ul class="list-group">
              <li class="list-group-item">
                <Link to="/r/4ls">
                  <input
                    type="button"
                    className="btn btn-outline-dark"
                    value="4 L's"
                  />
                </Link>
                <p style={{ marginTop: "2%" }}>
                  Easy to fill with things liked, learned, lacked and longed for
                </p>
                <h2 style={{ color: "green" }}>Available Now!</h2>
              </li>
            </ul>
          </div>
          <div class="col" style={{ textAlign: "center" }}>
            <ul class="list-group">
              <li class="list-group-item">
                <input
                  type="button"
                  className="btn btn-outline-dark"
                  value="KALM"
                />
                <p style={{ marginTop: "2%" }}>
                  Get to know the things to keep, add, less and more
                </p>
                <h2>Coming Soon!</h2>
              </li>
            </ul>
          </div>
        </div>
        <br></br>
        <div class="row align-items-start">
          <div class="col" style={{ textAlign: "center" }}>
            <ul class="list-group">
              <li class="list-group-item">
                <input
                  type="button"
                  className="btn btn-outline-dark"
                  value="SSM"
                />
                <p style={{ marginTop: "2%" }}>
                  Let your team tell you what to stop, start and continue
                </p>
                <h2>Coming Soon!</h2>
              </li>
            </ul>
          </div>
          <div class="col" style={{ textAlign: "center" }}>
            <ul class="list-group">
              <li class="list-group-item">
                <input
                  type="button"
                  className="btn btn-outline-dark"
                  value="4By4"
                />
                <p style={{ marginTop: "2%" }}>
                  Rate the state, people, tech and processes by how they feel
                </p>
                <h2>Coming Soon!</h2>
              </li>
            </ul>
          </div>
        </div>
        <br></br>
        <div class="row">
          <div class="col" style={{ textAlign: "center" }}>
            <input
              type="button"
              value="Sign Out"
              className="btn btn-danger"
              onClick={this.handleSignOut}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { CHANGE_USER_STATUS })(Dashboard);

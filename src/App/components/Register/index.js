import React, { Component } from "react";
import { connect } from "react-redux";

import RegisterForm from "./form";
import firebaseService from "../../services/firebase";
import { CHANGE_USER_STATUS } from "../../actions";
import history from "../../history";

class Register extends Component {
  state = { regError: "" };
  handleRegister = async ({ email, password }) => {
    this.setState({ ...this.state, regError: "" });
    firebaseService.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const firebaseUser = {
          uid: res.user,
          email: res.user.email,
          displayName: res.user.displayName
        };
        this.props.CHANGE_USER_STATUS(firebaseUser);
        history.push({ pathname: "/" });
      })
      .catch(err => {
        this.setState({ ...this.state, regError: err.message });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="sidenav">
          <div className="login-main-text">
            <h2>RetrospecUP</h2>
            <p>Register from here to access the dashboard.</p>
          </div>
        </div>
        <div className="main">
          <div className="col-md-6 col-sm-12">
            <div className="login-form">
              {this.state.regError && (
                <div class="alert alert-danger" role="alert">
                  {this.state.regError}
                </div>
              )}
              <RegisterForm onSubmit={this.handleRegister}></RegisterForm>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { CHANGE_USER_STATUS })(Register);

import React, { Component } from "react";
import { connect } from "react-redux";

import SubmitValidationForm from "./form";
import firebaseService from "../../services/firebase";
import history from "../../history";
import "./style.css";

import { CHANGE_USER_STATUS } from "../../actions";

class Login extends Component {
  state = { loginErr: "" };

  onSubmitCall = async ({ email, password }) => {
    this.setState({ ...this.state, loginErr: "" });
    if (firebaseService.auth) {
      firebaseService.auth
        .signInWithEmailAndPassword(email, password)
        .then(async res => {
          await firebaseService.getUserData(res.user.uid).then(res => {
            this.props.CHANGE_USER_STATUS(res);
            history.push({ pathname: "/" });
          })
        })
        .catch(err => {
          console.log(err);
          this.setState({ ...this.state, loginErr: err.message });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="sidenav">
          <div className="login-main-text">
            <h2>RetrospecUP</h2>
            <p>Login or register from here to access the Dashboard.</p>
          </div>
        </div>
        <div className="main">
          <div className="col-md-6 col-sm-12">
            <div className="login-form">
              {this.state.loginErr && (
                <div class="alert alert-danger" role="alert">
                  {this.state.loginErr}
                </div>
              )}
              <SubmitValidationForm
                onSubmit={this.onSubmitCall}
              ></SubmitValidationForm>
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

export default connect(mapStateToProps, { CHANGE_USER_STATUS })(Login);

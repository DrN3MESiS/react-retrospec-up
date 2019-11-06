import React, { Component } from "react";
import { connect } from "react-redux";
import SubmitValidationForm from "./form";
import firebaseService from "../../services/firebase";

import { CHANGE_USER_STATUS } from "../../actions";

class Login extends Component {
  onSubmitCall = ({ email, password }) => {
    email !== "" &&
      password !== "" &&
      (firebaseService.auth &&
        firebaseService.auth
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            const firebaseUser = { email, uid: res.user.uid };
            firebaseService.getUserData(res.user.uid).then(newUserData => {
              this.props.CHANGE_USER_STATUS(firebaseUser);
            });
          }));
  };

  render() {
    return (
      <SubmitValidationForm onSubmit={this.onSubmitCall}></SubmitValidationForm>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { CHANGE_USER_STATUS }
)(Login);

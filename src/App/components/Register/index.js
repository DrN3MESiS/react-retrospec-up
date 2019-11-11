import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterForm from './form';
import firebaseService from '../../services/firebase';
import { CHANGE_USER_STATUS } from '../../actions';
import history from '../../history';

class Register extends Component {
  handleRegister = async ({ email, password }) => {
    const res = await firebaseService.auth.createUserWithEmailAndPassword(
      email,
      password,
    );

    console.log(res);
    const firebaseUser = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
    };

    this.props.CHANGE_USER_STATUS(firebaseUser);
    history.push({ pathname: '/' });
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

export default connect(
  mapStateToProps,
  { CHANGE_USER_STATUS },
)(Register);

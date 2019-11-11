import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubmitValidationForm from './form';
import firebaseService from '../../services/firebase';
import history from '../../history';
import './style.css';

import { CHANGE_USER_STATUS } from '../../actions';

class Login extends Component {
  onSubmitCall = async ({ email, password }) => {
    if (firebaseService.auth) {
      const res = await firebaseService.auth.signInWithEmailAndPassword(
        email,
        password,
      );

      const firebaseUser = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
      };
      this.props.CHANGE_USER_STATUS(firebaseUser);
      history.push({ pathname: '/' });
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

export default connect(
  mapStateToProps,
  { CHANGE_USER_STATUS },
)(Login);

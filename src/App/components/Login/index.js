import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SubmitValidationForm from './form';
import firebaseService from '../../services/firebase';
import history from '../../history';

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
        <SubmitValidationForm
          onSubmit={this.onSubmitCall}
        ></SubmitValidationForm>
        <Link to="/register">
          <a>Don't have an account? Register here</a>
        </Link>
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

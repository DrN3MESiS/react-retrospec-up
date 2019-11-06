import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import firebaseService from '../services/firebase';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.firebaseCheck();
  }
  firebaseCheck = () => {
    const { setUser } = this.props;
    firebaseService.init();
    //Retrieve data from firebase
    firebaseService.onAuthStateChanged(authUser => {
      if (authUser) {
        //Retrieve data from firebase
        firebaseService.getUserData(authUser.uid).then(user => {
          console.log(user);
          setUser(user);
        });
      }
    });
  };
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
Auth.propTypes = {
  setUser: PropTypes.func.isRequired,
};
export default Auth;

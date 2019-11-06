import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import firebaseService from './services/firebase';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { CHANGE_USER_STATUS } from './actions'

class App extends Component {
  firebaseCheck = () => {
    firebaseService.init();
    firebaseService.onAuthStateChanged(authUser => {
      if (authUser) {
        firebaseService.getUserData(authUser.uid).then(user => {
          this.props.CHANGE_USER_STATUS(user);
        });
      }
    });
  };

  componentDidMount(){
    this.firebaseCheck();
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            
            {this.props.auth_status.isSignedIn ? (
              <Route path="/" exact component={Dashboard}></Route>
            ) : (
              <Route path="/" exact component={Login}></Route>
            )}
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  {CHANGE_USER_STATUS},
)(App);

import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import firebaseService from './services/firebase';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { CHANGE_USER_STATUS } from './actions';
import Register from './components/Register';
import history from './history';
import FourLs from './components/Dashboard/subcomponents/4Ls';

class App extends Component {
  firebaseCheck = () => {
    firebaseService.init();
    firebaseService.onAuthStateChanged(authUser => {
      if (authUser) {
        const firebaseUser = {
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          logoutAccount: authUser,
        };
        this.props.CHANGE_USER_STATUS(firebaseUser);
      }
    });
  };

  componentDidMount() {
    this.firebaseCheck();
  }

  renderPaths = () => {
    if (this.props.auth_status.isSignedIn) {
      return (
        <React.Fragment>
          <Route path="/" exact component={Dashboard}></Route>
          <Route path="/r/4ls" exact component={FourLs}></Route>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/" exact component={Login}></Route>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <Switch>{this.renderPaths()}</Switch>
        </Router>
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
)(App);

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            {this.props.auth.isSignedIn ? (
              <Route path="/dashboard" exact component={Dashboard}></Route>
            ) : (
              <div></div>
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
  {},
)(App);

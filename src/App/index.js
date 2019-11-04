import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/dashboard" exact component={Dashboard}></Route>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;

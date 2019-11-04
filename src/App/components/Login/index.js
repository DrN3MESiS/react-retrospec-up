import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div class="ui card">
        <div class="content">
          <h2>Login</h2>
        </div>
        <div class="ui input">
          <input type="text" placeholder="Username..." />
        </div>
        <div class="ui input">
          <input type="text" placeholder="password..." />
        </div>
        <button class="ui primary button">Login</button>
      </div>
    );
  }
}

export default Login;

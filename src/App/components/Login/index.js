import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubmitValidationForm from './form';

class Login extends Component {
  onSubmitCall = values => {
    console.log(values);
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
  {},
)(Login);

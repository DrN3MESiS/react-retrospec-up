import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form4L from './form';

export class FourLs extends Component {
  //Liked, Learn, Lacked, Longed
  handleSubmit = formValues => {
    console.log(formValues);
  };

  render() {
    return (
      <React.Fragment>
        <Form4L onSubmit={this.handleSubmit}></Form4L>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(FourLs);

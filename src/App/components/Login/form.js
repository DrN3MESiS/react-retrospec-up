import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom'

class SubmitValidationForm extends Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div><label className="text-danger">{error}</label></div>;
    }
  };

  renderField = ({ input, label, type, ph, classM, iconsrc, meta: { touched, error } }) => (
    <div class="form-group">
      <h5><i className={`fa ${iconsrc} icon`}></i>{label}</h5>
        <input {...input} placeholder={ph} type={type} className={classM} />
        {this.renderError({ touched, error })}
    </div>
  );

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    const { error, handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="email"
          type="text"
          component={this.renderField}
          classM="form-control"
          iconsrc="fa-envelope"
          label="Mail:"
          ph="Enter an email..."
        />
        <Field
          name="password"
          type="password"
          classM="form-control"
          iconsrc="fa-key"
          component={this.renderField}
          label="Password:"
          ph="Enter a password..."
        />
        {error && <strong>{error}</strong>}
          <input type="submit" className="btn btn-black" disabled={submitting} value="Log In"/>
          <hr></hr>
          <Link to="/register">Don't have an account? Register here!</Link>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'You must enter an email!';
  }

  if (!formValues.password) {
    errors.password = 'You must enter a password!';
  }

  return errors;
};

export default reduxForm({
  form: 'LOGIN_FORM',
  validate,
})(SubmitValidationForm);

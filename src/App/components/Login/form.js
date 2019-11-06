import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class SubmitValidationForm extends Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <h5 className="ui red header">{error}</h5>;
    }
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {this.renderError({ touched, error })}
      </div>
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
          label="Enter email..."
        />
        <Field
          name="password"
          type="password"
          component={this.renderField}
          label="Enter password..."
        />
        {error && <strong>{error}</strong>}
        <div>
          <button type="submit" disabled={submitting}>
            Log In
          </button>
        </div>
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

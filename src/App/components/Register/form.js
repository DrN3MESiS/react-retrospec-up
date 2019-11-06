import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class RegisterForm extends Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <label className="ui red header">{error}</label>;
    }
  };

  renderField = ({ input, label, type, title, meta: { touched, error } }) => (
    <div>
      <label>{title}</label>
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
          title="Enter an email:"
          label="Type your email..."
        />
        <Field
          name="password"
          type="password"
          component={this.renderField}
          title="Enter a password:"
          label="Type your password..."
        />
        {error && <strong>{error}</strong>}
        <div>
          <button type="submit" disabled={submitting}>
            Register
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
  form: 'REGISTER_FORM',
  validate,
})(RegisterForm);

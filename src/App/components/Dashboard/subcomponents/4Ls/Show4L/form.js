import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class AnswerForm extends Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <label className="text-danger">{error}</label>
        </div>
      );
    }
  };

  renderField = ({
    input,
    label,
    type,
    ph,
    classM,
    iconsrc,
    meta: { touched, error }
  }) => (
    <div className="form-group">
      <h5>
        <i className={`fa ${iconsrc} icon`}></i>
        {label}
      </h5>
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
          name="answer"
          type="text"
          component={this.renderField}
          classM="form-control"
          iconsrc="fa-keyboard-o"
          label="Enter your answer:"
          ph="Waiting for input..."
        />
        {error && <strong>{error}</strong>}

        <hr></hr>
        <input
          type="submit"
          className="btn btn-outline-dark"
          disabled={submitting}
          value="Submit Answer"
        />
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.answer) {
    errors.answer = "You must enter an answer!";
  }

  return errors;
};

export default reduxForm({
  form: "ANSWER_FORM",
  validate
})(AnswerForm);

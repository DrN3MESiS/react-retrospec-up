import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

class Form4L extends Component {
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
          name="name"
          type="text"
          component={this.renderField}
          classM="form-control"
          iconsrc="fa-keyboard-o"
          label="Name of the Retrospective:"
          ph="Enter the name of the retrospective..."
        />
        <table className="table table-dark" style={{width: '100%'}}>
          <tbody>
          <tr>
            <th>
              <Field
                name="liked"
                type="text"
                component={this.renderField}
                classM="form-control"
                iconsrc="fa-keyboard-o"
                label="Liked:"
                ph="Enter what you liked..."
              />
            </th>
            <th>
              <Field
                name="learned"
                type="text"
                component={this.renderField}
                classM="form-control"
                iconsrc="fa-keyboard-o"
                label="Learned:"
                ph="Enter what you learned..."
              />
            </th>
            <th>
              <Field
                name="lacked"
                type="text"
                component={this.renderField}
                classM="form-control"
                iconsrc="fa-keyboard-o"
                label="Lacked:"
                ph="Enter what you thought it lacked..."
              />
            </th>
            <th>
              <Field
                name="longed"
                type="text"
                component={this.renderField}
                classM="form-control"
                iconsrc="fa-keyboard-o"
                label="Longed For:"
                ph="Enter what you longed for..."
              />
            </th>
          </tr>
          </tbody>
        </table>

        {error && <strong>{error}</strong>}

        <hr></hr>
        <input
          type="submit"
          className="btn btn-black"
          disabled={submitting}
          value="Submit Retrospective"
        />
        <Link to="/r/4Ls">
          <input
            type="button"
            className="btn btn-danger"
            value="Cancel Retrospective"
          ></input>
        </Link>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "You must enter a name!";
  }

  if (!formValues.liked) {
    errors.liked = "You must enter something here!";
  }

  if (!formValues.learned) {
    errors.learned = "You must enter something here!";
  }

  if (!formValues.lacked) {
    errors.lacked = "You must enter something here!";
  }

  if (!formValues.longed) {
    errors.longed = "You must enter something here!";
  }

  return errors;
};

export default reduxForm({
  form: "4L_FORM",
  validate
})(Form4L);

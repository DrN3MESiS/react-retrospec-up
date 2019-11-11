import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import firebaseService from '../../services/firebase';
import { CHANGE_USER_STATUS } from '../../actions';

class Dashboard extends Component {
  handleSignOut = async () => {
    await firebaseService.auth.signOut();
    const firebaseUser = {
      uid: null,
    };
    this.props.CHANGE_USER_STATUS(firebaseUser);
  };

  render() {
    return (
      <div>
        Dashboard
        <Link to="/r/4ls">
          <input
            type="button"
            value="4 L's"
            className="btn btn-primary"
          ></input>
        </Link>
        <Link to="/r/">
          <input
            type="button"
            value="Under Development"
            disabled
            className="btn btn-primary"
          ></input>
        </Link>
        <Link to="/r/">
          <input
            type="button"
            value="Under Development"
            disabled
            className="btn btn-primary"
          ></input>
        </Link>
        <Link to="/r/">
          <input
            type="button"
            value="Under Development"
            disabled
            className="btn btn-primary"
          ></input>
        </Link>
        <input
          type="button"
          value="Sign Out"
          className="btn btn-danger"
          onClick={this.handleSignOut}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { CHANGE_USER_STATUS },
)(Dashboard);

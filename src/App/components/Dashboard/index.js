import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <input type="button" value="Sign Out" onClick={this.handleSignOut} />
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

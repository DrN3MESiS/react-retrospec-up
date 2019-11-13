import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import firebaseService from "../../services/firebase";
import { CHANGE_USER_STATUS } from "../../actions";

class Dashboard extends Component {
  handleSignOut = async () => {
    await firebaseService.auth.signOut();
    const firebaseUser = {
      uid: null
    };
    this.props.CHANGE_USER_STATUS(firebaseUser);
  };

  render() {
    return (
      <div>
        <input
          type="button"
          value="Sign Out"
          className="btn btn-danger"
          onClick={this.handleSignOut}
        />
        <div>
          <Link to="/r/4ls">
            <input
              type="button"
              class="btn btn-outline-dark"
              style={{ marginTop: "20%" }}
              value="4 L's"
            />
          </Link>
          <p style={{ marginTop: "2%" }}>
            Easy to fill with things liked, learned, lacked and longed for
          </p>
        </div>
        <div>
          <input
            type="button"
            class="btn btn-outline-dark"
            style={{ marginTop: "20%" }}
            value="KALM"
          />
          <p style={{ marginTop: "2%" }}>
            Get to know the things to keep, add, less and more
          </p>
          <h2>Coming Soon!</h2>
        </div>
        <div>
          <input
            type="button"
            class="btn btn-outline-dark"
            style={{ marginTop: "10%" }}
            value="SSM"
          />
          <p style={{ marginTop: "2%" }}>
            Let your team tell you what to stop, start and continue
          </p>
          <h2>Coming Soon!</h2>
        </div>
        <div>
          <input
            type="button"
            class="btn btn-outline-dark"
            style={{ marginTop: "10%" }}
            value="4By4"
          />
          <p style={{ marginTop: "2%" }}>
            Rate the state, people, tech and processes by how they feel
          </p>
          <h2>Coming Soon!</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { CHANGE_USER_STATUS })(Dashboard);

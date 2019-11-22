import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form4L from './form';
import firebaseService from '../../../../../services/firebase'
import {CHANGE_USER_STATUS} from '../../../../../actions'
import history from '../../../../../history'


export class FourLs extends Component {
  //Liked, Learn, Lacked, Longed
  handleSubmit = formValues => {
    const {name, liked, learned, lacked, longed} = formValues;
    const likedData = [liked];
    const learnedData = [learned];
    const lackedData = [lacked];
    const longedData = [longed];

    const retrospective = {
      name,
      owner: this.props.auth_status.uid,
      editable: false,
      likedData,
      learnedData,
      lackedData,
      longedData
    }

    const retId = firebaseService.createRet(retrospective)
    firebaseService.getUserData(this.props.auth_status.uid).then(res=>{
      const data = res;
      data.retros.push(retId);
      firebaseService.updateUserData(data).then(res=>{
        this.props.CHANGE_USER_STATUS(data);
        history.push('/r/4ls');
      })
    })
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

export default connect(mapStateToProps,{CHANGE_USER_STATUS})(FourLs);

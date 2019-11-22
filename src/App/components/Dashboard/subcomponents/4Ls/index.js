import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import firebaseService from '../../../../services/firebase'
import {CHANGE_USER_STATUS} from '../../../../actions'

export class Dash4L extends Component {
    componentDidMount = async () => {
        const user = this.props.auth_status.uid;
        await firebaseService.getUserData(user).then(res => {
            this.props.CHANGE_USER_STATUS(res);
        })
    }

    renderRetrospectives = () => {
        const retros = this.props.auth_status.retros;
        if(retros && retros.length !== 0){
            return retros.map( e => {
                return <li className="list-group-item">{e}</li>
            })
        } else {
            return <li className="list-group-item">You haven't created any retrospective yet!</li>
        }
    }

    render() {
        return (
            <React.Fragment>
                <Link to='/r/4ls/create'><input type="button" className="btn btn-primary" value="Create 4L Restrospective"></input></Link>
                <Link to='/'><input type="button" className="btn btn-warning" value="Go Back"></input></Link>
                <hr></hr>
                <h1>Your Retrospectives: <span onClick={this.refreshData} className="badge badge-secondary">Refresh Data</span></h1>
                <ul className="list-group">
                    {this.renderRetrospectives()}
                </ul>
                
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, {CHANGE_USER_STATUS})(Dash4L)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

export class Dash4L extends Component {
    renderRetrospectives = () => {
        const retros = this.props.auth_status.retros;
        console.log(retros)
        if(retros){
            return retros.map( e => {
                return <li className="list-group-item">Data</li>
            })
        } else {
            return <li className="list-group-item">You haven't created any retrospective yet!</li>
        }
    }

    render() {
        return (
            <React.Fragment>
                <Link to='/r/4ls/create'><input type="button" className="btn btn-warning" value="Create 4L Restrospective"></input></Link>
                <hr></hr>
                <h1>Your Retrospectives:</h1>
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

export default connect(mapStateToProps, )(Dash4L)

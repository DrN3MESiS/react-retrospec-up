import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Show4L extends Component {
    renderData = () =>{
        
        console.log(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                {this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}


export default connect(mapStateToProps, {})(Show4L)

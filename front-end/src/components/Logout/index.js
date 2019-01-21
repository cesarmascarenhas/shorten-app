import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as ACTIONS from '../../actions'
import { Redirect } from "react-router-dom"

export  class Logout extends Component {

  componentDidMount(){
    this.props.dispatch(ACTIONS.logoutUser())
  }

  render() {
    return (
        <Redirect to="/" />
    )
  }
}
function mapStateToProps(state){
    return state
}
export default connect(mapStateToProps)(Logout);

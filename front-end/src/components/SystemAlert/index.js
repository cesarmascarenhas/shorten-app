import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as ACTIONS from '../../actions'

export  class SystemAlert extends Component{

    systemAlert = (time) => {

        const   UI_SYSTEM_ALERT = document.getElementById('system-alert')

        setTimeout(() => {
            UI_SYSTEM_ALERT.style.transform = 'translate(-50%,calc(0% + 20px))'
        }, 100 )

        setTimeout(() => {
            UI_SYSTEM_ALERT.style = ''
        }, time * 1000)

        setTimeout(()=>{
            this.props.dispatch(ACTIONS.clearStatus())
        }, time * 1000 + 500 )


    }
    
    componentDidMount(){
        this.systemAlert(this.props.time)
    }

    render(){
        return (
            <div id="system-alert">
                <div id="system-alert-msg"><i style={{marginRight:10}} className="fas fa-exclamation-triangle"></i>  {this.props.msg}</div>
            </div>
        )
    }
   
  
}
const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(SystemAlert)
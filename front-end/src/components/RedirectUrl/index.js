import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as ACTIONS from '../../actions'
import { Link } from 'react-router-dom'

export class RedirectUrl extends Component {
  
  componentWillMount(){
      this.props.dispatch( ACTIONS.getUrl(this.props.match.params.code) )
  }

  redirect(url){
    window.location.assign(url)
  }

  render() {

    const { shorten } = this.props
    
    if(shorten.long){
        this.redirect(shorten.long)
    }

    return (
            
        shorten.error ?
            <div id="bg-form">
                
                <div id="form-container">
                    <h1>
                        <div style={{fontSize:18,marginBottom:10}}><Link to="/"><i className="fas fa-chevron-left"></i> Try Shortener</Link></div>
                        {shorten.error ? shorten.error : ''}
                    </h1>
                </div> 
            </div>
        :
        <div id="bg-form">
            <div id="form-container">
                <h1>Redirecting...</h1>
            </div> 
        </div>
    )
  }

}
function mapStateToProps(state){
    return state
}
export default connect(mapStateToProps)(RedirectUrl)


import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as ACTIONS from '../../actions'
import { ShortenedCard } from '../../components'
import { Link } from 'react-router-dom'
import * as urlTest from 'url-regex'

class Home extends Component {
  constructor(props) {
    super(props);
    this.clearStatus = this.clearStatus.bind(this);
  }
  
  state = {
    url:''
  }

  handleUrl(url){
      this.setState({url:url})
  }

  shorten(user={}) {

      if (this.state.url === '') {
          this.props.dispatch(ACTIONS.failed("Empty field"))
          return
      }
      if( !urlTest().test(this.state.url) ){
        this.props.dispatch(ACTIONS.failed("Invalid url"))
        return 
      }
      new Promise((resolve, reject) => {
          this.props.dispatch(ACTIONS.addUrl({
              long: this.state.url,
              ...user
          }))
          resolve()
          
      }).then(() => {
          this.setState({
              url: ''
          })
      })
  }

  clearStatus(){
      this.props.dispatch(ACTIONS.clearStatus())
  }

  render() {

    const { shorten, status, user } = this.props 
    
    return (
      <div>
        <div id="bg-form">
            <div className="login">
                {
                    user.username ?
                    <Link to='/logout'><i className="fas fa-sign-out-alt"></i> <small>Logout</small></Link>
                    :
                    <Link to='/login'><i className="fas fa-sign-in-alt"></i> <small>Login</small></Link>
                }  
                
            </div>  
            <div id="shorten" className={ status.shortened ? 'active' : '' }>
                <h1><i className="fas fa-smile-wink"></i> Welcome to shortener <span style={{color:'#03a9f4'}}>{user.username?user.username:''}</span> !</h1>
                <h3>Shorten it your urls.<br/>Your social media posts appreciate it!</h3>
                <div id="shorten-form">
                    <input onFocus={ () => this.clearStatus() } onChange={ (e) => this.handleUrl(e.target.value) } type="url" placeholder={ status.requested ? "Making magic..." : "Paste a link to shorten it" } value={this.state.url}></input>
                    <button onClick={ ()  => this.shorten( user.username ? user : {} ) }>{ status.requested ? <i className="fas fa-circle-notch spinner"></i> : 'Shorten' }</button>
                </div>
                { 
                    status.shortened ? 
                        <ShortenedCard close={this.clearStatus} url={ 
                            {

                                meta: shorten.meta,
                                long: shorten.long,
                                short: shorten.short,
                                views: shorten.views
                            }
                        }/>
                    :
                        ''
                }
            </div>           
        </div>        
      </div>
    )
  }
}
const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(Home)

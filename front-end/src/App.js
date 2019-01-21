import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import  { Home, Login, Logout, SystemAlert, ShortenedUrls, StaticContent, RedirectUrl} from './components'
import {connect} from 'react-redux'

class App extends Component {
   
    render() {
        const { status, urls} = this.props
        return (
            <Router>
                <div className="App">

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/:code" render={(props) => <RedirectUrl {...props} /> } />
                </Switch>

                {
                    urls.length > 0 ?
                        <ShortenedUrls urls={urls} />
                    :
                        <StaticContent />
                }
                
                { 
                    status.failed ?
                        <SystemAlert msg={status.msg} time={3} /> 
                    :
                        ''
                }
                <p  style={{textAlign:'center',height:"100px",lineHeight:"100px"}}><small>All rights reserved.</small></p>
                </div> 

            </Router>
        );
  }
}
function mapStateToProps(state){
    return state
}
export default connect(mapStateToProps)(App);

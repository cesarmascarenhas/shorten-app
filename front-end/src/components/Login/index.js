import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as ACTIONS from '../../actions'
import {Redirect,Link} from 'react-router-dom'


export class Login extends Component {

    state={
        username:'',
        password:''
    }

    handleUsername(e){
        this.setState({username:e.target.value})
    }
    handlePassword(e){
        this.setState({password:e.target.value})
    }

    create(){

        const {username,password} = this.state
        if(username === '' && password === ''){
            this.props.dispatch(ACTIONS.failed("All fields are required"))
            return
        }
        this.props.dispatch(ACTIONS.addUser({username,password}))
    
    }

    login(){

        const {username,password} = this.state
        if(username === '' && password === ''){
            this.props.dispatch(ACTIONS.failed("All fields are required"))
            return
        }
        this.props.dispatch(ACTIONS.loginUser({username,password}))
    
    }
    
    render() {
        const {status} = this.props

        if(status.logged || status.registered){
            return <Redirect to='/' />
        }
        
        return (            
            <div>
                <div id="bg-form"> 
                    <div id="form-container">                        
                        <div id="login">
                            
                            <h1 style={{marginTop:0}}>
                                <i className="fas fa-smile-wink"></i> Welcome to shortener!
                            </h1>
                            <h3 style={{margin:0}}>Please login or create an account</h3>
                            
                            <input onChange={(e)=>this.handleUsername(e)} type="text"     placeholder="Username" value={this.state.username}></input>
                            <input onChange={(e)=>this.handlePassword(e)} type="password"  placeholder="Password" value={this.state.password}></input>
                            
                            { status.requested ? 
                                <div className="actions" style={{fontSize:30}}><i className="fas fa-circle-notch spinner"></i></div>
                                :
                                <div className="actions">
                                    <button onClick={()=>this.create()}><i className="fas fa-plus"></i> Sign up</button>
                                    <button onClick={()=>this.login()}><i className="fas fa-sign-in-alt"></i> Sing in</button>
                                </div>
                            }
                            

                        </div>
                    </div>
                    <div className="login" style={{fontSize:18}}><Link to="/"><i className="fas fa-chevron-left"></i> Home</Link></div>

                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Login)
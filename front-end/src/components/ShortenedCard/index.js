import React, { Component } from 'react';


export default class ShortenedCard extends Component {

    state = {
        copied:false
    }

    copyToClipboard = () => {

        document.getElementById('urlcopy').select();
        document.execCommand('copy');
        this.setState({copied:true})

    }
    
    render(){
        
        const {meta,short,long,views} = this.props.url
        
        return (            
            <div id="shortened">
                <div className="close" onClick={ () => this.props.close() }>
                    <i className="far fa-times-circle"></i>
                </div>
                <div style={{overflow:"hidden",padding:"10px 0px"}}>
                    <h4 style={{margin:0}} dangerouslySetInnerHTML={ { __html: meta.title } } />
                    <small>{ long } | redirected {views}x</small>
                    <h2>http://localhost:3000/{short}</h2>
                    { 
                        this.state.copied ? 
                        <button className="copied" style={{width:'100%'}}><i className="fas fa-check"></i> Copied</button>
                        :
                        <button onClick={() => this.copyToClipboard()} style={{width:'100%'}}><i className="fas fa-link"></i> Copy URL</button>
                    }
                    <input id="urlcopy" readOnly type="text" value={ `http://localhost:3000/${short}` } />
                </div>
               
            </div>
        )
    }
    
    
}


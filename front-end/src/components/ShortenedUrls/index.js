import React, { Component } from 'react'
import ShortenedUrlsItem from './ShortenedUrlsItem'

export default class ShortenedUrls extends Component {
  render() {
    return (
      <div>         
         <ul>
            <p><i className="fas fa-history"></i> User history</p>
             { this.props.urls.map( url => <ShortenedUrlsItem key={url.short} url={url} /> )}
         </ul>
      </div>
    )
  }
}

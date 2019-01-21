import React, { Component } from 'react'

export default class ShortenedUrslItem extends Component {
  render() {
    return (
      <li>
        <table>
            <tbody>
                <tr>
                    <th>Url</th>
                    <th>Code</th>
                    <th>Created</th>
                    <th>Redirects</th>
                </tr>
                <tr>
                    <td style={{width:'70%'}}>
                        {this.props.url.long}<br/>
                        <small dangerouslySetInnerHTML={ { __html: this.props.url.meta.title } }></small>
                    </td>
                    <td>{this.props.url.short}</td>
                    <td>{new Date(this.props.url.timestamp).toLocaleDateString()}</td>
                    <td>{this.props.url.views}</td>
                </tr>
            </tbody>
        </table>
      </li>
    )
  }
}

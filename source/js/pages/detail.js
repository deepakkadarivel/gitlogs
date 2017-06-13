import React, { Component } from 'react'
import ajax from 'superagent'

class DetailComponent extends Component {

  constructor() {
    super()
    this.state = {
      commits: [],
    }
  }

  componentWillMount() {
    ajax.get('https://api.github.com/repos/facebook/react/commits')
    .end((error, response) => {
      if (!error && response) {
        console.dir(response.body)
        this.setState({
          commits: response.body,
        })
      } else {
        console.log('====================================')
        console.log('There was an error fetching response form github', error)
        console.log('====================================')
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.commits.map((commit, index) => {
          const author = commit.commit.author ? commit.commit.author.name : 'Anonymous'
          return (
            <p key={ index }>
              <strong>{ author }</strong>
              <a href={ commit.html_url }>{ commit.commit.message }</a>
            </p>
          )
        })}
      </div>
    )
  }
}

export default DetailComponent

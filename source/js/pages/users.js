import React, { Component } from 'react'
import ajax from 'superagent'

class UserComponent extends Component {
  constructor({ match }) {
    super()
    this.state = {
      events: [],
      name: match.params.name,
    }
  }

  componentWillMount() {
    this.fetchFeed()
  }

  fetchFeed() {
    const BaseURL = `https://api.github.com/users`
    ajax.get(`${ BaseURL }/${ this.state.name }/events`)
    .end((error, response) => {
      if (!error && response) {
        this.setState({
          events: response.body,
        })
      } else {
        console.log(`Error fetching ${ this.state.name },`, error)
      }
    })
  }

  renderUser() {
    return this.state.events.map((event, index) => {
      const eventType = event.type
      const repoName = event.repo.name
      const creationDate = event.created_at
      return (
        <li key={ index }>
          <strong>{repoName}</strong>: {eventType}
          at {creationDate}.
        </li>
      )
    })
  }

  render() {
    const content = this.renderUser()
    return (
      <div>
        { content }
      </div>
    )
  }
}

export default UserComponent
import React, { Component } from 'react'
import ajax from 'superagent'

class DetailComponent extends Component {

  constructor() {
    super()
    this.state = {
      mode: 'commits',
      commits: [],
      forks: [],
      pulls: [],
    }
    this.selectMode = this.selectMode.bind(this)
  }

  componentWillMount() {
    this.fetchFeed('commits')
    this.fetchFeed('pulls')
    this.fetchFeed('forks')
  }

  selectMode(mode) {
    this.setState({
      mode,
    })
  }

  fetchFeed(type) {
    ajax.get(`https://api.github.com/repos/facebook/react/${ type }`)
    .end((error, response) => {
      if (!error && response) {
        this.setState({
          [type]: response.body,
        })
      } else {
        console.log(`Error fetching ${ type }.`, error)
      }
    })
  }

  renderCommits() {
    return this.state.commits.map((commit, index) => {
      const author = commit.commit.author ? commit.commit.author.name : 'Anonymous'
      return (
        <p key={ index }>
          <strong>{ author }</strong>
          <a href={ commit.html_url }>{ commit.commit.message }</a>
        </p>
      )
    })
  }

  renderPulls() {
    return this.state.pulls.map((pull, index) => {
      const user = pull.user ? pull.user.login : 'Anonymous'
      return (
        <p key={ index }>
          <strong>{ user }</strong>
          <a href={ pull.html_url }>{ pull.body }</a>
        </p>
      )
    })
  }

  renderForks() {
    return this.state.forks.map((fork, index) => {
      const owner = fork.owner ? fork.owner.login : 'Anonymous'
      return (
        <p key={ index }>
          <strong>{ owner }</strong>
          <a href={ fork.html_url }>{ fork.message }</a> at { fork.created_at }.
        </p>
      )
    })
  }

  render() {
    let content
    if (this.state.mode === 'commits') {
      content = this.renderCommits()
    } else if (this.state.mode === 'pulls') {
      content = this.renderPulls()
    } else if (this.state.mode === 'forks') {
      content = this.renderForks()
    }
    return (
      <div>
        <button onClick={ () => this.selectMode('commits') }>Commits</button>
        <button onClick={ () => this.selectMode('pulls') }>Pulls</button>
        <button onClick={ () => this.selectMode('forks') }>Forks</button>
        { content }
      </div>
    )
  }
}

export default DetailComponent

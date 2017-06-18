import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class List extends Component {
  render() {
    return (
      <div>
        <p>Please choose a Repo from the list below : </p>
        <ul>
          <li><NavLink to='/react'>React</NavLink></li>
          <li><NavLink to='/react-native'>React Native</NavLink></li>
          <li><NavLink to='/jest'>Jest</NavLink></li>
        </ul>
      </div>
    )
  }
}

export default List
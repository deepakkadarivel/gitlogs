import React from 'react'
import { Route, Switch } from 'react-router-dom'

import DetailComponent from './pages/detail'
import ListComponent from './pages/list'
import UserComponent from './pages/users'

const Routes = (
  <Switch>
    <Route exact path='/' component={ ListComponent } />
    <Route exact path='/:repo' component={ DetailComponent } />
    <Route path='/:repo/:name' component={ UserComponent } />
  </Switch>
)

export default Routes
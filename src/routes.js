import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import NotFound from './containers/NotFound'
import UserPage from './containers/UserPage'

export default (
  <Route path="/" component={App}>
  	<IndexRoute component={UserPage} />
  	<Route path="/user/:username" component={UserPage} />
    <Route path="*" component={NotFound} />
  </Route>
)
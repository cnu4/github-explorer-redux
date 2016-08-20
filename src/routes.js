import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import NotFound from './containers/NotFound'
import UserPage from './containers/UserPage'
import RepoList from './containers/RepoList'
import RepoDetail from './containers/RepoDetail'

export default (
  <Route path="/" component={App}>
  	<IndexRoute component={UserPage} />
  	<Route path="/user/:username" component={UserPage} />
  	<Route path="/user/:username/repos" component={RepoList} />
  	<Route path="/user/:username/repos/:repoName" component={RepoDetail} />
    <Route path="*" component={NotFound} />
  </Route>
)
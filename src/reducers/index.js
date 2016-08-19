/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'
import * as ActionTypes from '../actions'
/* Populated by react-webpack-redux:reducer */
function userProfile (state = {}, action) {
  switch (action.type) {
    case ActionTypes.USER_PROFILE_RECEIVED:
      return action.response
    default:
      return state
  }
}

function userProfileRepos (state = [], action) {
  switch (action.type) {
    case ActionTypes.USER_PROFILE_REPOS_RECEIVED:
      return action.response.items
    default:
      return state
  }
}

function users (state = [], action) {
  switch (action.type) {
    case ActionTypes.USERS_RECEIVED:
      return action.response.users.slice(0, 15)
    default:
      return state
  }
}

function menuStatus (state = 'close', action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_NAV_MENU:
      return state === 'close' ? 'open' : 'close'
    case ActionTypes.OPEN_NAV_MENU:
      return 'open'
    case ActionTypes.CLOSE_NAV_MENU:
      return 'close'
    case ActionTypes.FULL_NAV_MENU:
      return 'full'
    default:
      return state
  }
}

function homeLoading (state = {showLoading: false, doneLoading: false, failed: false}, action) {
  switch (action.type) {
    case ActionTypes.USER_PROFILE_REPOS_REQUEST:
      return {
        showLoading: true,
        doneLoading: false,
        failed: false
      }
    case ActionTypes.USER_PROFILE_REPOS_RECEIVED:
      return {
        showLoading: true,
        doneLoading: true,
        failed: false
      }
    case ActionTypes.USER_PROFILE_REPOS_FAILURE:
      return {
        showLoading: true,
        doneLoading: false,
        failed: true
      }
    case ActionTypes.HIDE_LOAD_BLOCK:
      return {
        showLoading: false,
        doneLoading: false,
        failed: false
      }
    default:
      return state
  }
}

function userSearching (state = {searching: false}, action) {
  switch (action.type) {
    case ActionTypes.USERS_REQUEST:
      return {
        searching: true
      }
    case ActionTypes.USERS_FAILURE:
    case ActionTypes.USERS_RECEIVED:
      return {
        searching: false
      }
    default:
      return state
  }
}

const rootReducers = combineReducers({
	userProfile,
  userProfileRepos,
  users,
  homeLoading,
  userSearching,
  menuStatus,
	routing
})

export default rootReducers

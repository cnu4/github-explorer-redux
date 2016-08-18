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
import {
  REQUEST_FAILED, TRIGGER_LOAD_ANIMATION,
  USER_PROFILE_RECEIVED,USER_PROFILE_REPOS_RECEIVED,
  TRIGGER_LOAD_ANIMATION_DONE } from '../actions'
/* Populated by react-webpack-redux:reducer */
function userProfile (state = {}, action) {
  switch (action.type) {
    case USER_PROFILE_RECEIVED:
      return action.profile
    default:
      return state
  }
}

function userProfileRepos (state = [], action) {
  switch (action.type) {
    case USER_PROFILE_REPOS_RECEIVED:
      return action.repos
    default:
      return state
  }
}

function loading (state = {showLoading: false, doneLoading: false}, action) {
  switch (action.type) {
    case TRIGGER_LOAD_ANIMATION:
      return {
        showLoading: true,
        doneLoading: state.doneLoading
      }
    case TRIGGER_LOAD_ANIMATION_DONE:
      return {
        showLoading: true,
        doneLoading: true
      }
    case REQUEST_FAILED:
      return {
        showLoading: false,
        doneLoading: false
      }
    default:
      return state
  }
}

const rootReducers = combineReducers({
	userProfile,
  userProfileRepos,
  loading,
	routing
})

export default rootReducers

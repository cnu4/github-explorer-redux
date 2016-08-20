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
import { REPO_PER_PAGE } from '../actions'
import { Base64 } from 'js-base64'

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
    case ActionTypes.USER_REPOS_REQUEST:
    case ActionTypes.REPO_DETAIL_REQUEST:
      return {
        showLoading: true,
        doneLoading: false,
        failed: false
      }
    case ActionTypes.USER_PROFILE_REPOS_RECEIVED:
    case ActionTypes.USER_REPOS_RECEIVED:
    case ActionTypes.USER_REPOS_NEXT_PAGE_RECEIVED:
    case ActionTypes.REPO_DETAIL_RECRIVED:
      return {
        showLoading: true,
        doneLoading: true,
        failed: false
      }
    case ActionTypes.USER_PROFILE_REPOS_FAILURE:
    case ActionTypes.USER_REPOS_FAILURE:
    case ActionTypes.REPO_DETAIL_FAILURE:
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

const repoPaginationInit = {
  page: 1,
  repos: [],
  complete: false
}
function repoPagination (state = repoPaginationInit, action) {
  switch (action.type) {
    case ActionTypes.USER_REPOS_RECEIVED:
      return {
        page: 1,
        repos: action.response.items,
        complete: action.response.items.length < REPO_PER_PAGE
      }
    case ActionTypes.USER_REPOS_NEXT_PAGE_RECEIVED:
      return {
        page: state.page + 1,
        repos: state.repos.concat(action.response.items),
        complete: action.response.items.length < REPO_PER_PAGE
      }
    default:
      return state
  }
}

function repoDetail (state = {}, action) {
  switch (action.type) {
    case ActionTypes.REPO_DETAIL_RECRIVED:
      return action.response
    default:
      return state
  }
}

function repoReadme (state = '', action) {
  switch (action.type) {
    case ActionTypes.REPO_README_RECRIVED:
      return (action.response.content && Base64.decode(action.response.content.replace(/\s/g, ''))) || ''
    default:
      return state
  }
}

function repoContents (state = [], action) {
  switch (action.type) {
    case ActionTypes.REPO_CONTENTS_RECRIVED:
      return action.response.sort((a, b) => a.type.localeCompare(b.type))
    default:
      return state
  }
}

function repoContribs (state = [], action) {
  switch (action.type) {
    case ActionTypes.REPO_CONTRIBS_RECRIVED:
      return action.response
    default:
      return state
  }
}

function repoLanguages (state = [], action) {
  switch (action.type) {
    case ActionTypes.REPO_LANGUAGES_RECRIVED:
      const languages = action.response
      const newLanguages = Object.keys(languages)
        .map(key => ({ name: key, value: languages[key] }))

      let total = 0;
      if (newLanguages.length === 0) {
        total = 0;
      } else if (newLanguages.length === 1) {
        total = newLanguages[0].value;
      } else {
        total = newLanguages.reduce((a, b) => ({ value: a.value + b.value })).value;
      }

      return newLanguages.map(a => ({
        name: a.name,
        value: Math.round(1000 * a.value / total) / 10
      }))
    default:
      return state
  }
}

const rootReducers = combineReducers({
	userProfile,
  userProfileRepos,
  users,
  repoPagination,
  repoDetail,
  repoReadme,
  repoContents,
  repoContribs,
  repoLanguages,
  homeLoading,
  userSearching,
  menuStatus,
	routing
})

export default rootReducers

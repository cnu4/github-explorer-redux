import 'isomorphic-fetch'

const TOKEN = '48d499e1bbc2e206d1e4f720f101af12a5918806';
export const REPO_PER_PAGE = 10;

export const HIDE_LOAD_BLOCK = 'HIDE_LOAD_BLOCK'
export const DEFAULT_REQUEST = 'DEFAULT_REQUEST'
export const DEFAULT_FAILURE = 'DEFAULT_FAILURE'

const api = (url) =>
  fetch(url, {
    header: {
      Authorization: `token ${TOKEN}`
    }
  })
  .then(response => response.json())

export const hideLoading = makeActionCreator(HIDE_LOAD_BLOCK)

export const TOGGLE_NAV_MENU = 'TOGGLE_NAV_MENU'
export const OPEN_NAV_MENU = 'OPEN_NAV_MENU'
export const CLOSE_NAV_MENU = 'CLOSE_NAV_MENU'
export const FULL_NAV_MENU = 'FULL_NAV_MENU'

export const toggleNavMenu = makeActionCreator(TOGGLE_NAV_MENU)
export const openNavMenu = makeActionCreator(OPEN_NAV_MENU)
export const closeNavMenu = makeActionCreator(CLOSE_NAV_MENU)
export const fullNavMenu = makeActionCreator(FULL_NAV_MENU)

export const USER_PROFILE_RECEIVED = 'USER_PROFILE_RECEIVED'

export function loadUserProfile (username) {
  return {
    types: [DEFAULT_REQUEST, USER_PROFILE_RECEIVED, DEFAULT_FAILURE],
    callAPI: () => api(`https://api.github.com/users/${username}`)
  }
}

export const USER_PROFILE_REPOS_REQUEST = 'USER_PROFILE_REPOS_REQUEST'
export const USER_PROFILE_REPOS_RECEIVED = 'USER_PROFILE_REPOS_RECEIVED'
export const USER_PROFILE_REPOS_FAILURE = 'USER_PROFILE_REPOS_FAILURE'

export function loadUserProfileRepos (username) {
  return {
    types: [USER_PROFILE_REPOS_REQUEST, USER_PROFILE_REPOS_RECEIVED, USER_PROFILE_REPOS_FAILURE],
    callAPI: () => api('https://api.github.com/search/repositories' +
      `?q=user:${username}&sort=stars&page=1&per_page=${REPO_PER_PAGE}`)
  }
}

export const USERS_REQUEST = 'USERS_REQUEST'
export const USERS_RECEIVED = 'USERS_RECEIVED'
export const USERS_FAILURE = 'USERS_FAILURE'

export function getUsers (keyword) {
  return {
    types: [USERS_REQUEST, USERS_RECEIVED, USERS_FAILURE],
    callAPI: () => api('https://api.github.com/legacy/user/search/' +
      `${keyword || Math.random().toString(36).split('')[2]}%20sort:followers`)
  }
}

export const USER_REPOS_REQUEST = 'USER_REPOS_REQUEST'
export const USER_REPOS_RECEIVED = 'USER_REPOS_RECEIVED'
export const USER_REPOS_NEXT_PAGE_RECEIVED = 'USER_REPOS_NEXT_PAGE_RECEIVED'
export const USER_REPOS_FAILURE = 'USER_REPOS_FAILURE'

export function searchUserRepos (user, keyword, page) {
  let types = [USER_REPOS_REQUEST, USER_REPOS_RECEIVED, USER_REPOS_FAILURE]
  if (+page > 1) {
    types[1] = USER_REPOS_NEXT_PAGE_RECEIVED
  }
  return {
    types,
    callAPI: () => api('https://api.github.com/search/repositories' +
      `?q=${keyword}%20user:${user}&sort=updated&page=${page}&per_page=${REPO_PER_PAGE}`)
  }
}

function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

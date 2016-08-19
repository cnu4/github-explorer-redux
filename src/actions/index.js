import 'isomorphic-fetch'

const TOKEN = '48d499e1bbc2e206d1e4f720f101af12a5918806';
const REPO_PER_PAGE = 10;

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

export function hideLoading () {
  return {
    type: HIDE_LOAD_BLOCK
  }
}

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

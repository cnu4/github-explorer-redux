import 'isomorphic-fetch'

const TOKEN = '48d499e1bbc2e206d1e4f720f101af12a5918806';
const REPO_PER_PAGE = 10;

export const REQUEST_FAILED = 'REQUEST_FAILED'
export const TRIGGER_LOAD_ANIMATION = 'TRIGGER_LOAD_ANIMATION'
export const TRIGGER_LOAD_ANIMATION_DONE = 'TRIGGER_LOAD_ANIMATION_DONE'
export const USER_PROFILE_RECEIVED = 'USER_PROFILE_RECEIVED'
export const USER_PROFILE_REPOS_RECEIVED = 'USER_PROFILE_REPOS_RECEIVED'

const api = (url) =>
  fetch(url, {
    header: {
      Authorization: `token ${TOKEN}`
    }
  })
  .then(response => response.json())


export function loadUserProfile (username) {
  return function (dispatch, getState) {
    dispatch({
      type: 'TRIGGER_LOAD_ANIMATION'
    })
    api(`https://api.github.com/users/${username}`).then(
      profile => {
        dispatch({
          type: USER_PROFILE_RECEIVED,
          profile
        })
        dispatch({
          type: TRIGGER_LOAD_ANIMATION_DONE
        })
      },
      error => dispatch({
        type: REQUEST_FAILED,
        error
      })
    )
  }
}

export function loadUserProfileRepos (username) {
  return function (dispatch, getState) {
    dispatch({
      type: 'TRIGGER_LOAD_ANIMATION'
    })
    api('https://api.github.com/search/repositories' +
    `?q=user:${username}&sort=stars&page=1&per_page=${REPO_PER_PAGE}`).then(
      data => dispatch({
        type: USER_PROFILE_REPOS_RECEIVED,
        repos: data.items
      }),
      error => dispatch({
        type: REQUEST_FAILED,
        error
      })
    )
  }
}

import { TRIGGER_LOAD_ANIMATION, TRIGGER_LOAD_ANIMATION_DONE } from '../actions'

export default store => next => action => {
  const {
    types,
    callAPI,
    showLoading
  } = action;

  if (typeof callAPI === 'undefined') {
    // 普通 action：传递
    return next(action);
  }

  if (
    !Array.isArray(types) ||
    (types.length !== 3) ||
    !types.every(type => typeof type === 'string')
  ) {
    throw new Error('Expected an array of three string types.');
  }

  if (typeof callAPI !== 'function') {
    throw new Error('Expected fetch to be a function.');
  }

  function actionWith (data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[callAPI]
    return finalAction
  }

  const [requestType, successType, failureType] = types;

  next(actionWith({type: requestType}))

  return callAPI().then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happend'
    }))
  );
}
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import callApi from '../middleware/api'
import reducers from '../reducers'

export default function configureStore(initialState) {
  const store = createStore(
  	reducers,
  	initialState,
  	applyMiddleware(thunkMiddleware, callApi)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

import './third-party/bootstrap.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './stores/configureStore';
import Root from './containers/Root';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store)

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('app')
// );

render(
	<Root store={store} history={history} />,
	document.getElementById('app')
)

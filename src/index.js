import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { logIn } from './actions'
import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#basic-info')
)

store.dispatch(logIn())

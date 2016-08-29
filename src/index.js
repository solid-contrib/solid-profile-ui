import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { loadProfile } from './actions'
import App from './app/containers/App'
import configureStore from './store'

const store = configureStore()

store.dispatch(loadProfile())
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector('#basic-info')
    )
  })

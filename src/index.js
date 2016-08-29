import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { getModels } from './actions'
import App from './app/containers/App'
import configureStore from './store'

const store = configureStore()

store.dispatch(getModels())
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector('#basic-info')
    )
  })

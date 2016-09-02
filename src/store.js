import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

const middlewares = [thunk]

if (new Set(['development', 'test']).has(process.env.NODE_ENV)) {
  const createLogger = require('redux-logger')
  middlewares.push(createLogger())
}

export default function configureStore () {
  return createStore(rootReducer, applyMiddleware(...middlewares))
}

import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './rootReducer'

// DEBUG - don't commit
import createLogger from 'redux-logger'
const logger = createLogger()

export default function configureStore () {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))
}

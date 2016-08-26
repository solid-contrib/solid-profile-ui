import { combineReducers } from 'redux'

import {
  LOAD,
  SELECT,
  CANCEL,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE
} from './action-types'

export function currentModel (state = {}, action) {
  switch (action.type) {
    case LOAD:
    case UPLOAD_SUCCESS:
      return action.model
    default:
      return state
  }
}

export function editedModel (state = {}, action) {
  // TODO: implement
  switch (action.type) {
    default:
      return state
  }
}

export function isUploading (state = false, action) {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return true
    case UPLOAD_SUCCESS:
    case UPLOAD_FAILURE:
      return false
    return state
  }
}

export default combineReducers({currentModel, editedModel, isUploading})

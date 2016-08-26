import { combineReducers } from 'redux'

import {
  PICTURE_LOAD,
  PICTURE_SELECT,
  PICTURE_CANCEL,
  PICTURE_UPLOAD_REQUEST,
  PICTURE_UPLOAD_SUCCESS,
  PICTURE_UPLOAD_FAILURE
} from './action-types'

export function currentModel (state = {}, action) {
  switch (action.type) {
    case PICTURE_LOAD:
    case PICTURE_UPLOAD_SUCCESS:
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
    case PICTURE_UPLOAD_REQUEST:
      return true
    case PICTURE_UPLOAD_SUCCESS:
    case PICTURE_UPLOAD_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({currentModel, editedModel, isUploading})

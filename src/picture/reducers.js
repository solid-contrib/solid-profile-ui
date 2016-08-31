import { combineReducers } from 'redux'

import {
  PICTURE_GET_MODEL,
  PICTURE_SAVE_MODEL_REQUEST,
  PICTURE_SAVE_MODEL_SUCCESS,
  PICTURE_SAVE_MODEL_FAILURE,
  PICTURE_SELECT,
  PICTURE_READ_SUCCESS,
  PICTURE_READ_FAILURE,
  PICTURE_CANCEL,
  PICTURE_UPLOAD_REQUEST,
  PICTURE_UPLOAD_SUCCESS,
  PICTURE_UPLOAD_FAILURE
} from './action-types'

export function model (state = {}, action) {
  switch (action.type) {
  case PICTURE_GET_MODEL:
  case PICTURE_SAVE_MODEL_SUCCESS:
    return action.model
  default:
    return state
  }
}

export function file (state = null, action) {
  switch (action.type) {
  case PICTURE_SELECT:
    return action.file
  case PICTURE_CANCEL:
  case PICTURE_UPLOAD_SUCCESS:
  case PICTURE_SAVE_MODEL_SUCCESS:
    return null
  default:
    return state
  }
}

export function fileDataUrl (state = '', action) {
  switch (action.type) {
  case PICTURE_READ_SUCCESS:
    return action.fileDataUrl
  case PICTURE_CANCEL:
  case PICTURE_SAVE_MODEL_SUCCESS:
    return ''
  default:
    return state
  }
}

export function isSaving (state = false, action) {
  switch (action.type) {
  case PICTURE_UPLOAD_REQUEST:
  case PICTURE_SAVE_MODEL_REQUEST:
    return true
  case PICTURE_CANCEL:
  case PICTURE_UPLOAD_SUCCESS:
  case PICTURE_UPLOAD_FAILURE:
  case PICTURE_SAVE_MODEL_SUCCESS:
  case PICTURE_SAVE_MODEL_FAILURE:
    return false
  default:
    return state
  }
}

export default combineReducers({model, file, fileDataUrl, isSaving})

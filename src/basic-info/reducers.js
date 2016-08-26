import { combineReducers } from 'redux'

import {
  LOAD,
  EDIT,
  FIELD_CHANGE,
  CANCEL_EDITING,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_FAILURE
} from './action-types'

function currentModel (state = {}, action) {
  switch (action.type) {
    case LOAD:
    case SAVE_SUCCESS:
      return action.model
    default:
      return state
  }
}

function editedModel (state = {}, action) {
  switch (action.type) {
    case EDIT:
      return action.model
    case FIELD_CHANGE:
      return state.set(action.field, {value: action.value})
    case CANCEL_EDITING:
    case SAVE_SUCCESS:
    case LOAD:
      return {}
    default:
      return state
  }
}

function isSaving (state = false, action) {
  switch (action.type) {
    case SAVE_REQUEST:
      return true
    case SAVE_SUCCESS:
    case SAVE_FAILURE:
      return false
  }
}

export default combineReducers({currentModel, editedModel, isSaving})

import { combineReducers } from 'redux'

import {
  BASIC_INFO_GET_MODEL,
  BASIC_INFO_EDIT,
  BASIC_INFO_FIELD_CHANGE,
  BASIC_INFO_CANCEL_EDITING,
  BASIC_INFO_SAVE_REQUEST,
  BASIC_INFO_SAVE_SUCCESS,
  BASIC_INFO_SAVE_FAILURE
} from './action-types'

export function currentModel (state = {}, action) {
  switch (action.type) {
    case BASIC_INFO_GET_MODEL:
    case BASIC_INFO_SAVE_SUCCESS:
      return action.model
    default:
      return state
  }
}

export function editedModel (state = {}, action) {
  switch (action.type) {
    case BASIC_INFO_EDIT:
      // Check if the model has name and email fields, and if not, add them.
      let edited = action.model
      const {name, mbox} = action.fieldCreators
      const requiredFields = [['name', name], ['mbox', mbox]]
      for (const [fieldKey, field] of requiredFields) {
        if (!edited.any(fieldKey)) {
          edited = edited.add(fieldKey, field('', {listed: true}))
        }
      }
      return edited
    case BASIC_INFO_FIELD_CHANGE:
      return state.set(action.field, {value: action.value})
    case BASIC_INFO_CANCEL_EDITING:
    case BASIC_INFO_SAVE_SUCCESS:
    case BASIC_INFO_GET_MODEL:
      return {}
    default:
      return state
  }
}

export function isSaving (state = false, action) {
  switch (action.type) {
    case BASIC_INFO_SAVE_REQUEST:
      return true
    case BASIC_INFO_SAVE_SUCCESS:
    case BASIC_INFO_SAVE_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({currentModel, editedModel, isSaving})

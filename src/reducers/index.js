import { combineReducers } from 'redux'

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  PROFILE_EDIT,
  PROFILE_FIELD_CHANGE,
  PROFILE_CANCEL_EDITING,
  PROFILE_SAVE_REQUEST,
  PROFILE_SAVE_SUCCESS
} from '../constants/action-types'

export function isLoading (state = false, action) {
  switch (action.type) {
    case LOG_IN_REQUEST:
    case PROFILE_SAVE_REQUEST:
      return true
    case LOG_IN_SUCCESS:
    case LOG_IN_FAILURE:
    case PROFILE_SAVE_SUCCESS:
      return false
    default:
      return state
  }
}

export function isEditing (state = false, action) {
  switch (action.type) {
    case PROFILE_EDIT:
      return true
    case PROFILE_CANCEL_EDITING:
    case PROFILE_SAVE_SUCCESS:
      return false
    default:
      return state
  }
}

export function profile (state = {}, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
    case PROFILE_SAVE_SUCCESS:
      return action.profile
    case LOG_IN_FAILURE:
    default:
      return state
  }
}

// editedProfile tracks the state of the profile being currently edited
export function editedProfile (state = {}, action) {
  switch (action.type) {
    case PROFILE_EDIT:
      return action.profile
    case PROFILE_FIELD_CHANGE:
      return state.set(action.field, {value: action.value})
    case PROFILE_CANCEL_EDITING:
    case PROFILE_SAVE_SUCCESS:
      return {}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  isLoading,
  isEditing,
  profile,
  editedProfile
})

export default rootReducer

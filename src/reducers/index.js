import { combineReducers } from 'redux'

import {
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  EDIT_PROFILE, CANCEL_EDITING_PROFILE, SAVE_PROFILE_REQUEST,
  SAVE_PROFILE_SUCCESS
} from '../actions'

export function isLoading (state = false, action) {
  switch (action.type) {
    case LOG_IN_REQUEST:
    case SAVE_PROFILE_REQUEST:
      return true
    case LOG_IN_SUCCESS:
    case LOG_IN_FAILURE:
    case SAVE_PROFILE_SUCCESS:
      return false
    default:
      return state
  }
}

export function isEditing (state = false, action) {
  switch (action.type) {
    case EDIT_PROFILE:
      return true
    case CANCEL_EDITING_PROFILE:
    case SAVE_PROFILE_SUCCESS:
      return false
    default:
      return state
  }
}

export function profile (state = {}, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
    case SAVE_PROFILE_SUCCESS:
      return action.profile
    case LOG_IN_FAILURE:
    default:
      return state
  }
}

const rootReducer = combineReducers({isLoading, isEditing, profile})

export default rootReducer

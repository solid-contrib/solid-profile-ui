import solid from 'solid-client'

import {
  PROFILE_EDIT,
  PROFILE_FIELD_CHANGE,
  PROFILE_CANCEL_EDITING,
  PROFILE_SAVE_REQUEST,
  PROFILE_SAVE_SUCCESS
} from '../constants/action-types'

export function editProfile (profile) {
  return {
    type: PROFILE_EDIT,
    profile
  }
}

export function changeProfileField (field, value) {
  return {
    type: PROFILE_FIELD_CHANGE,
    field,
    value
  }
}

export function cancelEditingProfile () {
  return { type: PROFILE_CANCEL_EDITING }
}

export function saveProfile (profile) {
  return dispatch => {
    dispatch(saveProfileRequest)
    return profile.save(solid.rdflib, solid.web)
      .then(currentProfile => dispatch(saveProfileSuccess(currentProfile)))
      // TODO: handle error
      .catch(err => console.log('error saving profile:', err))
  }
}

export function saveProfileRequest () {
  return { type: PROFILE_SAVE_REQUEST }
}

export function saveProfileSuccess (profile) {
  return {
    type: PROFILE_SAVE_SUCCESS,
    profile
  }
}

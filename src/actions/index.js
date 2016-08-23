import solid from 'solid-client'

import createProfile from '../profile'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export function logIn () {
  return function (dispatch) {
    dispatch(logInRequest())
    return solid.login()
      .then(webId => solid.getProfile(webId))
      .then(solidProfile => dispatch(logInSuccess(createProfile(solidProfile))))
      .catch(error => dispatch(logInFailure(error)))
  }
}

export function logInRequest () {
  return { type: LOG_IN_REQUEST }
}

export function logInSuccess (profile) {
  console.log('login success called with profile:', profile)
  return {
    type: LOG_IN_SUCCESS,
    profile
  }
}

export function logInFailure (error) {
  console.log('login failed with error:', error)
  return {
    type: LOG_IN_FAILURE,
    error
  }
}

export const EDIT_PROFILE = 'EDIT_PROFILE'
export const CANCEL_EDITING_PROFILE = 'CANCEL_EDITING_PROFILE'
export const SAVE_PROFILE_REQUEST = 'SAVE_PROFILE_REQUEST'
export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS'

export function editProfile () {
  return { type: EDIT_PROFILE }
}

export function cancelEditingProfile () {
  return { type: CANCEL_EDITING_PROFILE }
}

export function saveProfile (profile) {
  return function (dispatch) {
    dispatch(saveProfileRequest)
    return profile.save(solid.rdflib, solid.web)
      .then(currentProfile => dispatch(saveProfileSuccess(currentProfile)))
  }
}

export function saveProfileRequest () {
  return { type: SAVE_PROFILE_REQUEST }
}

export function saveProfileSuccess (profile) {
  return {
    type: SAVE_PROFILE_SUCCESS,
    profile
  }
}

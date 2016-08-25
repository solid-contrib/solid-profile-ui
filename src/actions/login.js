import solid from 'solid-client'

import createProfile from '../models/profile'

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
} from '../constants/action-types'

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
  return {
    type: LOG_IN_SUCCESS,
    profile
  }
}

export function logInFailure (error) {
  return {
    type: LOG_IN_FAILURE,
    error
  }
}

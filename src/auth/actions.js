import solid from 'solid-client'

import createProfile from '../models/profile'

import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE
} from './action-types'

export function logIn () {
  return dispatch => {
    dispatch(authRequest())
    return solid.login()
      .then(webId => dispatch(authSuccess(webId)))
      // .then(webId => solid.getProfile(webId))
      // .then(solidProfile => dispatch(authSuccess(createProfile(solidProfile))))
      .catch(error => dispatch(authFailure(error)))
  }
}

export function authRequest () {
  return { type: AUTH_REQUEST }
}

export function authSuccess (webId) {
  return {
    type: AUTH_SUCCESS,
    webId
  }
}

export function authFailure (error) {
  return {
    type: AUTH_FAILURE,
    error
  }
}

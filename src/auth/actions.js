import solid from 'solid-client'

import createProfile from '../models/profile'

import {
  REQUEST,
  SUCCESS,
  FAILURE
} from './action-types'

export function authenticate () {
  return dispatch => {
    dispatch(request())
    return solid.login()
      .then(webId => dispatch(success(webId)))
      // .then(webId => solid.getProfile(webId))
      // .then(solidProfile => dispatch(success(createProfile(solidProfile))))
      .catch(error => dispatch(failure(error)))
  }
}

export function request () {
  return { type: REQUEST }
}

export function success (webId) {
  return {
    type: SUCCESS,
    webId
  }
}

export function failure (error) {
  return {
    type: FAILURE,
    error
  }
}

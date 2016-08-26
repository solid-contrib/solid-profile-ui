import {
  LOAD,
  SELECT,
  CANCEL,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE
} from './action-types'

export function load (model) {
  return {
    type: LOAD,
    model
  }
}

export function select (file) {
  return {
    type: SELECT,
    file
  }
}

export function upload () {
  throw new Error('TODO: implement me')
}

export function uploadRequest () {
  return {
    type: UPLOAD_REQUEST
  }
}

export function uploadSuccess (model) {
  return {
    type: UPLOAD_SUCCESS,
    model
  }
}

export function uploadFailure (error) {
  return {
    type: UPLOAD_FAILURE,
    error
  }
}

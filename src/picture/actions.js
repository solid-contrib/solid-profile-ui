import {
  PICTURE_LOAD,
  PICTURE_SELECT,
  PICTURE_CANCEL,
  PICTURE_UPLOAD_REQUEST,
  PICTURE_UPLOAD_SUCCESS,
  PICTURE_UPLOAD_FAILURE
} from './action-types'

import { createPictureModel } from './models'

export function load (solidProfile) {
  return {
    type: PICTURE_LOAD,
    model: createPictureModel(solidProfile)
  }
}

export function select (file) {
  return {
    type: PICTURE_SELECT,
    file
  }
}

export function upload () {
  throw new Error('TODO: implement me')
}

export function uploadRequest () {
  return {
    type: PICTURE_UPLOAD_REQUEST
  }
}

export function uploadSuccess (model) {
  return {
    type: PICTURE_UPLOAD_SUCCESS,
    model
  }
}

export function uploadFailure (error) {
  return {
    type: PICTURE_UPLOAD_FAILURE,
    error
  }
}

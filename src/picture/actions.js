import solid from 'solid-client'
import 'whatwg-fetch'

import {
  PICTURE_GET_MODEL,
  PICTURE_SAVE_MODEL_REQUEST,
  PICTURE_SAVE_MODEL_SUCCESS,
  PICTURE_SAVE_MODEL_FAILURE,
  PICTURE_SELECT,
  PICTURE_READ_SUCCESS,
  PICTURE_READ_FAILURE,
  PICTURE_CANCEL,
  PICTURE_UPLOAD_REQUEST,
  PICTURE_UPLOAD_SUCCESS,
  PICTURE_UPLOAD_FAILURE
} from './action-types'
import { createPictureModel } from './models'

export function getModel (solidProfile) {
  return {
    type: PICTURE_GET_MODEL,
    model: createPictureModel(solidProfile.parsedGraph, solidProfile.webId)
  }
}

export function uploadAndSave (storageUrl, file) {
  return (dispatch, getState) => {
    dispatch(uploadRequest())
    const data = new FormData()
    data.append('file', file)
    return fetch(storageUrl, {method: 'POST', body: data})
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return dispatch(uploadSuccess(resp.headers.get('location')))
        } else {
          const error = new Error(resp.statusText)
          error.resp = resp
          throw error
        }
      })
      .catch(error => dispatch(uploadFailure(error)))
      .then(successAction => {
        const model = getState().picture.model
        const imgField = model.get('img')[0]
        const newPicURL = successAction.uploadedURL
        return dispatch(save(model.set(imgField, {value: newPicURL})))
      })
      .catch(error => dispatch(saveFailure(error)))
  }
}

export function uploadRequest () {
  return {
    type: PICTURE_UPLOAD_REQUEST
  }
}

export function uploadSuccess (uploadedURL) {
  return {
    type: PICTURE_UPLOAD_SUCCESS,
    uploadedURL
  }
}

export function uploadFailure (error) {
  return {
    type: PICTURE_UPLOAD_FAILURE,
    error
  }
}

export function save (model) {
  return dispatch => {
    dispatch(saveRequest())
    return model.save(solid.rdflib, solid.web)
      .then(currentModel => dispatch(saveSuccess(currentModel)))
      .catch(error => dispatch(saveFailure(error)))
  }
}

export function saveRequest () {
  return {
    type: PICTURE_SAVE_MODEL_REQUEST
  }
}

export function saveSuccess (model) {
  return {
    type: PICTURE_SAVE_MODEL_SUCCESS,
    model
  }
}

export function saveFailure (error) {
  return {
    type: PICTURE_SAVE_MODEL_FAILURE,
    error
  }
}

export function pick (file) {
  return dispatch => {
    dispatch(select(file))
    const fileReader = new FileReader()
    fileReader.onload = event => {
      dispatch(readSuccess(event.target.result))
    }
    fileReader.onerror = event => {
      dispatch(readFailure(event.target.error))
    }
    fileReader.readAsDataURL(file)
  }
}

export function select (file) {
  return {
    type: PICTURE_SELECT,
    file
  }
}

export function readSuccess (fileDataUrl) {
  return {
    type: PICTURE_READ_SUCCESS,
    fileDataUrl
  }
}

export function readFailure (error) {
  return {
    type: PICTURE_READ_FAILURE,
    error
  }
}

export function cancel () {
  return {
    type: PICTURE_CANCEL
  }
}

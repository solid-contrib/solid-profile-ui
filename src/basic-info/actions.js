import solid from 'solid-client'

import {
  LOAD,
  EDIT,
  FIELD_CHANGE,
  CANCEL_EDITING,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_FAILURE
} from './action-types'

export function load (model) {
  return {
    type: LOAD,
    model
  }
}

export function edit (model) {
  return {
    type: EDIT,
    model
  }
}

export function changeField (field, value) {
  return {
    type: FIELD_CHANGE,
    field,
    value
  }
}

export function cancelEditing () {
  return { type: CANCEL_EDITING }
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
  return { type: SAVE_REQUEST }
}

export function saveSuccess (model) {
  return {
    type: SAVE_SUCCESS,
    model
  }
}

export function saveFailure (error) {
  return {
    type: SAVE_FAILURE,
    error
  }
}

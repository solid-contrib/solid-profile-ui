import solid from 'solid-client'

import {
  BASIC_INFO_GET_MODEL,
  BASIC_INFO_EDIT,
  BASIC_INFO_FIELD_CHANGE,
  BASIC_INFO_CANCEL_EDITING,
  BASIC_INFO_SAVE_REQUEST,
  BASIC_INFO_SAVE_SUCCESS,
  BASIC_INFO_SAVE_FAILURE
} from './action-types'

import { createBasicInfoModel } from './models'

export function getModel (solidProfile) {
  return {
    type: BASIC_INFO_GET_MODEL,
    model: createBasicInfoModel(solidProfile.parsedGraph, solidProfile.webId)
  }
}

export function edit (model, fieldCreators) {
  return {
    type: BASIC_INFO_EDIT,
    model,
    fieldCreators
  }
}

export function changeField (field, value) {
  return {
    type: BASIC_INFO_FIELD_CHANGE,
    field,
    value
  }
}

export function cancelEditing () {
  return { type: BASIC_INFO_CANCEL_EDITING }
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
  return { type: BASIC_INFO_SAVE_REQUEST }
}

export function saveSuccess (model) {
  return {
    type: BASIC_INFO_SAVE_SUCCESS,
    model
  }
}

export function saveFailure (error) {
  return {
    type: BASIC_INFO_SAVE_FAILURE,
    error
  }
}

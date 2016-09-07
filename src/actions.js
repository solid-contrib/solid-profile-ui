import solid from 'solid-client'

import {
  SOLID_PROFILE_LOAD_SUCCESS,
  SOLID_PROFILE_LOAD_FAILURE
} from './action-types'
import { authenticate } from './auth/actions'
import { getModel as getBasicInfoModel } from './basic-info/actions'
import { getModel as getPictureModel } from './picture/actions'

export function getModels () {
  return dispatch => {
    return dispatch(authenticate())
      .then(action => solid.getProfile(action.webId))
      .then(solidProfile => {
        dispatch(getBasicInfoModel(solidProfile))
        dispatch(getPictureModel(solidProfile))
        return dispatch(loadSolidProfileSuccess(solidProfile))
      })
      .catch(error => dispatch(loadSolidProfileFailure(error)))
  }
}

export function loadSolidProfileSuccess (solidProfile) {
  return {
    type: SOLID_PROFILE_LOAD_SUCCESS,
    solidProfile
  }
}

export function loadSolidProfileFailure (error) {
  return {
    type: SOLID_PROFILE_LOAD_FAILURE,
    error
  }
}

import solid from 'solid-client'

import { authenticate } from './auth/actions'
import { getModel as getBasicInfoModel } from './basic-info/actions'
import { getModel as getPictureModel } from './picture/actions'

export function loadProfile () {
  return dispatch => {
    return dispatch(authenticate())
      .then(action => solid.getProfile(action.webId))
      .then(solidProfile => {
        dispatch(getBasicInfoModel(solidProfile))
        dispatch(getPictureModel(solidProfile))
        return solidProfile
      })
  }
}

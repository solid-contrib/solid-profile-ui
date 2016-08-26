import solid from 'solid-client'

import { authenticate } from './auth/actions'
import { load as loadBasicInfo } from './basic-info/actions'
import { load as loadPicture } from './picture/actions'

export function loadProfile () {
  return dispatch => {
    dispatch(authenticate())
      .then(action => solid.getProfile(action.webId))
      .then(solidProfile => {
        dispatch(loadBasicInfo(solidProfile))
        // dispatch(loadPicture(solidProfile))
        return solidProfile
      })
  }
}

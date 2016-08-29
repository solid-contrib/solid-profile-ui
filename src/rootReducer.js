import { combineReducers } from 'redux'

import { SOLID_PROFILE_LOAD } from './action-types'
import auth from './auth/reducers'
import basicInfo from './basic-info/reducers'
import picture from './picture/reducers'

export function solidProfile (state = {}, action) {
  switch (action.type) {
    case SOLID_PROFILE_LOAD:
      return action.solidProfile
    default:
      return state
  }
}

export default combineReducers({
  auth,
  basicInfo,
  picture,
  solidProfile
})

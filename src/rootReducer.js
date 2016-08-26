import { combineReducers } from 'redux'

import auth from './auth/reducers'
import basicInfo from './basic-info/reducers'
import picture from './picture/reducers'

export default combineReducers({
  auth,
  basicInfo,
  picture
})

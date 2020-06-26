import {combineReducers} from 'redux'

import auth from './auth'
import fetchData from './fetchData'
import actionData from './actionData'

export default combineReducers({
  auth,
  fetchData,
  actionData
})
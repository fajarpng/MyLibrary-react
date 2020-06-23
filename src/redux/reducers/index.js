import {combineReducers} from 'redux'

import auth from './auth'
import fetchData from './fetchData'

export default combineReducers({
  auth,
  fetchData
})
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import auth from './auth'
import fetchData from './fetchData'
import actionData from './actionData'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
  key: 'root',
  stateReconciler: hardSet,
  storage,
  // whitelist: ['auth']
}

const rootReducer = combineReducers({
  auth,
  fetchData,
  actionData
})

export default persistReducer(persistConfig, rootReducer);
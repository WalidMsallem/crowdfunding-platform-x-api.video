import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer from './auth.reducer'
import projectsReducer from './projects.reducer'
import history from '../../utils/history'

const createReducer = (injectedReducers = {}): object | any => {
  const rootReducer = combineReducers({
    auth: authReducer,
    projects: projectsReducer,
    router: connectRouter(history),
    ...injectedReducers,
  })

  return rootReducer
}
export default createReducer

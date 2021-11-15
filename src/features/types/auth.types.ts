import { ActionType } from 'typesafe-actions'
import * as actions from '../actions/auth.actions'

/* --- STATE --- */

interface Data {
  authInfo: {
    token_type: string
    expires_in: number
    access_token: string | any
    refresh_token: string | any
  }
}
interface Local {
  isAuthenticated: boolean
  loading: {
    fetchToken: boolean
  }
  errors: {
    fetchToken: string
  }
}
interface AuthStateInter {
  data: Data
  local: Local
}

/* --- ACTIONS --- */
type authActions = ActionType<typeof actions>

/* --- EXPORTS --- */

export type AuthState = AuthStateInter
export type AuthActions = authActions

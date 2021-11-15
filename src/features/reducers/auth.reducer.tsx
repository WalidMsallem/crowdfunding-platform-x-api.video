/**
 * auth reducer
 */

import ActionTypes from '../constants/auth.constants'
import { AuthState, AuthActions } from '../types/auth.types'
import {
  encryptAndSave,
  remove as removeToken,
  load as loadStorageItem,
} from '../../utils/storage'
import { notification } from 'antd'
import produce from 'immer'
import { handleErrorMessage } from '../../utils/reducer.utils'

 
// The initial state of the reducer
export const initialState: AuthState = {
  data: {
    authInfo: {
      token_type: 'Bearer',
      expires_in: 0,
      access_token: loadStorageItem('access_token'),
      refresh_token: loadStorageItem('refresh_token'),
    },
  },
  local: {
    isAuthenticated: false,
    loading: {
      fetchToken: false,
    },
    errors: {
      fetchToken: '',
    },
  },
}

const authReducer = (
  state: AuthState = initialState,
  action: AuthActions | any,
): AuthState =>
  produce(state, (draft: AuthState) => {
    switch (action.type) {
      // list of  al porojects
      case ActionTypes.AUTHENTICATE.request:
      case ActionTypes.REFRESH_TOKEN.request:
        draft.local.loading.fetchToken = true
        draft.local.errors.fetchToken = ''
        break
      case ActionTypes.AUTHENTICATE.success:
      case ActionTypes.REFRESH_TOKEN.success:
        draft.local.loading.fetchToken = false
        draft.local.errors.fetchToken = ''
        draft.data.authInfo = action.data
        draft.local.isAuthenticated = true
        console.log('action.data.access_token', action.data.access_token)
        console.log('action.data.access_token', action.data.refresh_token)
        encryptAndSave('access_token', JSON.stringify(action.data.access_token))
        encryptAndSave(
          'refresh_token',
          JSON.stringify(action.data.refresh_token),
        )
        break
      case ActionTypes.AUTHENTICATE.failure:
      case ActionTypes.REFRESH_TOKEN.failure:
        draft.local.loading.fetchToken = false
        removeToken('access_token')
        removeToken('refresh_token')
        draft.local.isAuthenticated = false
        draft.local.errors.fetchToken = handleErrorMessage(action)
        notification['error']({
          message: 'Auth error',
          description: handleErrorMessage(action),
        })
        break
    }
  })

export default authReducer

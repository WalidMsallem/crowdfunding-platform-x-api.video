/**
 * auth Sagas
 */

import { takeEvery, put, call } from 'redux-saga/effects'
import { AuthActions } from '../types/auth.types'
import * as api from '../services/auth.services'
import ActionTypes from '../constants/auth.constants'
import ProjectsActionTypes from '../constants/projects.constants'
 

export function* authenticate(action: AuthActions | any) {
  try {
    const authResponse = yield call(api.authenticate)
    yield put({
      type: ActionTypes.AUTHENTICATE.success,
      data: authResponse,
    })
    yield put({
      type: ProjectsActionTypes.GET_UPLOAD_TOKENS_LIST.request,
      token: authResponse.access_token,
    })
  } catch (e) {
    console.log('e', e)
    yield put({ type: ActionTypes.AUTHENTICATE.failure, e })
  }
}

export function* authenticateWatcher() {
  yield takeEvery(ActionTypes.AUTHENTICATE.request, authenticate)
}

export function* refreshToken(action: AuthActions | any) {
  try {
    const projectResponse = yield call(api.refreshToken)
    yield put({
      type: ActionTypes.REFRESH_TOKEN.success,
      data: projectResponse,
    })
  } catch (e) {
    yield put({ type: ActionTypes.REFRESH_TOKEN.failure, e })
  }
}

export function* refreshTokenWatcher() {
  yield takeEvery(ActionTypes.REFRESH_TOKEN.request, refreshToken)
}

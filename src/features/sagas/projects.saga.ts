/**
 * Projects Sagas
 */

import { takeEvery, put, call } from 'redux-saga/effects'
import { ProjectsActions } from '../types/projects.types'
import * as api from '../services/projects.services'
import ActionTypes, { STEPPER_STATE } from '../constants/projects.constants'

export function* getProjects(action: ProjectsActions | any) {
  try {
    const projectsResponse = yield call(api.getProjects, action.payload)
    yield put({
      type: ActionTypes.GET_PROJECTS.success,
      data: projectsResponse,
    })
  } catch (e) {
    // console.log('e', e)
    yield put({ type: ActionTypes.GET_PROJECTS.failure, e })
  }
}

export function* getProjectsWatcher() {
  yield takeEvery(ActionTypes.GET_PROJECTS.request, getProjects)
}

export function* createProject(action: ProjectsActions | any) {
  try {
    const projectResponse = yield call(api.createProject, action.payload)
    yield put({
      type: ActionTypes.CREATE_PROJECT.success,
      data: projectResponse,
    })
    yield put({
      type: ActionTypes.CHANGE_STEP,
      data: STEPPER_STATE.upload,
    })
  } catch (e) {
    yield put({ type: ActionTypes.CREATE_PROJECT.failure, e })
  }
}

export function* createProjectWatcher() {
  yield takeEvery(ActionTypes.CREATE_PROJECT.request, createProject)
}

export function* genrateUploadToken(action: ProjectsActions | any) {
  try {
    const genrateUploadTokenResponse = yield call(
      api.genrateUploadToken,
      action.payload,
    )
    yield put({
      type: ActionTypes.GENERATE_UPLOAD_TOKEN.success,
      data: genrateUploadTokenResponse,
    })
  } catch (e) {
    yield put({ type: ActionTypes.GENERATE_UPLOAD_TOKEN.failure, e })
  }
}

export function* genrateUploadTokenWatcher() {
  yield takeEvery(ActionTypes.GENERATE_UPLOAD_TOKEN.request, genrateUploadToken)
}
export function* getUploadTokensList(action: ProjectsActions | any) {
  try {
    const getUploadTokensListResponse = yield call(
      api.getUploadTokensList,
      action.token,
      '',
    )
    yield put({
      type: ActionTypes.GET_UPLOAD_TOKENS_LIST.success,
      data: getUploadTokensListResponse,
    })
    const validToken = action.data.data.find((el) => el.ttl === 0)
    if (!validToken) {
      yield put({
        type: ActionTypes.GENERATE_UPLOAD_TOKEN.success,
      })
    }
  } catch (e) {
    yield put({ type: ActionTypes.GET_UPLOAD_TOKENS_LIST.failure, e })
  }
}

export function* getUploadTokensListWatcher() {
  yield takeEvery(
    ActionTypes.GET_UPLOAD_TOKENS_LIST.request,
    getUploadTokensList,
  )
}

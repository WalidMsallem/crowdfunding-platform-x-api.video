/**
 * Combine  Sagas  watcher
 */

import { all } from 'redux-saga/effects'

import { authenticateWatcher, refreshTokenWatcher } from './auth.saga'
import {
  getProjectsWatcher,
  createProjectWatcher,
  genrateUploadTokenWatcher,
  getUploadTokensListWatcher,
} from './projects.saga'

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    authenticateWatcher(),
    refreshTokenWatcher(),
    getProjectsWatcher(),
    createProjectWatcher(),
    genrateUploadTokenWatcher(),
    getUploadTokensListWatcher(),
  ])
}

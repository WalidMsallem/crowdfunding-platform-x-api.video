import { put, call } from 'redux-saga/effects'

export const sagaTypes = {
  GET: 'get',
  DELETE: 'delete',
  POST: 'post',
  PUT: 'put',
  WITHOUT_API: 'without_api',
}
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export const generateActionTypes = (root: string, prefix: string) => ({
  request: `${root}${prefix}_${REQUEST}`,
  success: `${root}${prefix}_${SUCCESS}`,
  failure: `${root}${prefix}_${FAILURE}`,
})

export const generateActionWithBody =
  (type: string): object =>
  (body: object) => ({
    type,
    body,
  })
export const generateActionWithId =
  (type: string): object =>
  (id: string) => ({
    type,
    id,
  })

export const generateEmptyAction =
  (type: string): object =>
  () => ({
    type,
  })

export const generateActionWithBodyAndId =
  (type: string): object =>
  (id: string, body: object) => ({
    type,
    id,
    body,
  })

type ActionTypes = {
  request: object
  success: object
  failure: object
}

type ActionWithId = {
  id: string
}
type ActionWithBody = {
  body: string
}
type ActionWithBodyAndId = {
  body: object
  id: string
}

function* fetchOrDeleteTemplate(
  actionTypes: ActionTypes,
  api: any,
  action: ActionWithId,
) {
  try {
    const result = yield call(api, action.id)
    yield put({
      type: actionTypes.success,
      data: result,
    })
  } catch (e) {
    // console.log('e', e)
    yield put({ type: actionTypes.failure, e })
  }
}

function* postTemplate(
  actionTypes: ActionTypes,
  api: any,
  action: ActionWithBody,
) {
  try {
    const result = yield call(api, action.body)
    yield put({
      type: actionTypes.success,
      data: result,
    })
  } catch (e) {
    // console.log('e', e)
    yield put({ type: actionTypes.failure, e })
  }
}

function* putTemplate(
  actionTypes: ActionTypes,
  api: any,
  action: ActionWithBodyAndId,
) {
  try {
    const result = yield call(api, action.id, action.body)
    yield put({
      type: actionTypes.success,
      data: result,
    })
  } catch (e) {
    // console.log('e', e)
    yield put({ type: actionTypes.failure, e })
  }
}

export const generateSaga = (
  sagaType: string,
  actionTypes: object,
  api: any,
) => {
  switch (sagaType) {
    case sagaTypes.GET:
    case sagaTypes.DELETE:
      return fetchOrDeleteTemplate.bind(null, actionTypes, api)
    case sagaTypes.POST:
      return postTemplate.bind(null, actionTypes, api)
    case sagaTypes.PUT:
      return putTemplate.bind(null, actionTypes, api)
    default:
      return 'Failed'
  }
}

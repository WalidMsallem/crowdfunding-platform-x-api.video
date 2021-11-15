/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-fallthrough */
import { pushNotification } from './asideMessage'
import {
  NOTIFICATION_TYPES,
  FAILURE,
  // GET,
} from './constants'
const isFailure = (action: any) => {
  return action.type.slice(-FAILURE.length) === FAILURE
}
// const isGet = (e) => e.config.method === GET

export const errorsExtraction = (errors: any) => {
  const arrayErrors = errors.map((e: { message: any; path: any[] }) => ({
    message: e.message,
    path: e.path[0],
  }))
  const obj = {}

  arrayErrors.forEach((element: any) => {
    obj[element.path] = element
  })
  return obj
}

const error400And424Handling = (
  store: any,
  next: Function,
  action: object | any,
) => {
  if (action.e && isFailure(action)) {
    if (action.e.response.status === 400) {
      const objectErrors = errorsExtraction(
        action.e.response.data.error.detailedInfo,
      )

      next({ ...action, objectErrors })
      //   next({ ...action })
      return
    }
  }
  next(action)
}

const error401Or403Handling = (
  store: any,
  next: Function,
  action: { e: { response: { status: number; data: { title: string } } } },
) => {
  if (action.e && isFailure(action)) {
    if (
      (action.e.response &&
        action.e.response.status &&
        action.e.response.status === 403) ||
      action.e.response.status === 401
    ) {
      // if (isGet(action.e)) {
      //   // redirection
      //   next(action)
      // } else {

      if (action.e.response && action.e.response.data.title) {
        pushNotification(NOTIFICATION_TYPES.error, action.e.response.data.title)
      }
      const arrayErrors = [action.e.response.data.title]
      next({ ...action, arrayErrors })
      return
      // }
    }
  }

  next(action)
}

const errorsHandling =
  (store: any) => (next: Function) => (action: { e: any }) => {
    if (action.e && action.e.response && isFailure(action)) {
      // eslint-disable-next-line default-case
      switch (action.e.response.status) {
        case 424:
        case 400:
          error400And424Handling(store, next, action)
          break
        case 403:
        case 401:
          error401Or403Handling(store, next, action)
          break
        case 500:
          error400And424Handling(store, next, action)
          break
      }
    } else {
      next(action)
    }
  }

// export default [errorsHandling, clearErrors]
export default [errorsHandling]

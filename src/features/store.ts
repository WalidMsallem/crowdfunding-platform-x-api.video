import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { createInjectorsEnhancer } from 'redux-injectors'
import { routerMiddleware } from 'connected-react-router'

import history from '../utils/history'

import reduxMiddlewares from '../utils/reduxMiddlewares'

import createReducer from './reducers/rootReducer'
import rootSaga from './sagas'

export default function configureAppStore(initialState = {}) {
  const reduxSagaMonitorOptions = {}
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)

  const { run: runSaga } = sagaMiddleware

  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    ...reduxMiddlewares,
  ]

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ]

  const store = configureStore({
    reducer: createReducer(),
    middleware: [...getDefaultMiddleware(), ...middlewares],
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  })

  sagaMiddleware.run(rootSaga)
  return store
}

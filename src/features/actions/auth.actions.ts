import { action } from 'typesafe-actions'
import ActionTypes from '../constants/auth.constants'

export const authenticate = () => action(ActionTypes.AUTHENTICATE.request)

export const refreshToken = () => action(ActionTypes.REFRESH_TOKEN.request)

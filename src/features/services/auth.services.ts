/**
 * auth services
 */

/* eslint-disable no-throw-literal */
import axios from 'axios'
import { requestHeaderWithoutToken } from '../../utils/requestHeader'
import URL from '../constants/services.constants'
import { load as loadStorageItem } from '../../utils/storage'

export const authenticate = async (): Promise<any> => {
  const key = process.env.REACT_APP_VIDEOS_API_KEY
  const result = await axios.post(
    URL.baseApiUrl() + URL.auth.authenticate,
    { apiKey: key },
    requestHeaderWithoutToken({}),
  )
  return result.data
}
export const refreshToken = async (): Promise<any> => {
  const result = await axios.post(
    URL.baseApiUrl() + URL.auth.refreshToken,
    { refreshToken: loadStorageItem('refresh_token') },
    requestHeaderWithoutToken({}),
  )
  return result.data
}

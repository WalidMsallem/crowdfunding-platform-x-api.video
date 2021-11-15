import { load as loadToken } from '../utils/storage'
// export const getToken = (): string | null =>
//   localStorage.getItem('access_token')

export const requestHeader = (
  options: object | null,
  overrideToken?: string | any,
): object => { 
  return {
    headers: {
      Authorization: `Bearer ${overrideToken || loadToken('access_token')}`,
      // Authorization: `Bearer ${tt}`,
      // 'Access-Control-Allow-Origin': 'sandbox.api.video',
      ...options,
    },
  }
}

export const requestHeaderWithoutToken = (options: object | null): object => ({
  headers: {
    ...options,
  },
})

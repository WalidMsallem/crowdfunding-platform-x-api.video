/**
 * Auth selectors
 */

import { createSelector } from 'reselect'

export const selectAuthInfo = createSelector(
  (state: any): object => state.auth,
  (metaData: any): string => metaData.data.authInfo,
)

export const selectAuthLocalData = createSelector(
  (state: any): object => state.auth,
  (metaData: any): string => metaData.local,
)

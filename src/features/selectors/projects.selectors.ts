/**
 * Projects selectors
 */

import { createSelector } from 'reselect'

export const selectprojectsList = createSelector(
  (state: any): object => state.projects,
  (projects: any): [] => projects.data.projects,
)
export const selectCurrentProject = createSelector(
  (state: any): object => state.projects,
  (projects: any): [] => projects.data.currentProject,
)
export const selectProjectLocalData = createSelector(
  (state: any): object => state.projects,
  (projects: any): object => projects.local,
)

 
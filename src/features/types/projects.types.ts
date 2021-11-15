import { ActionType } from 'typesafe-actions'
import * as actions from '../actions/projects.actions'

/* --- STATE --- */
interface Data {
  currentProject: {}
  uploadTokens: {
    data: never[] 
    pagination: {}
  }
  projects: {
    data: []
    pagination: {}
  }
  uploadToken: {
    token: string,
    ttl: number,
    createdAt: string,
    expiresAt: string | any,
  },
}

interface Local {
  loading: {
    getProjects: boolean
    creatingProject: boolean
    genrateUploadToken: boolean
    getUploadTokens: boolean
  }
  errors: {
    getProjects: string
    creatingProject: string
    genrateUploadToken: string
    getUploadTokens: string
  }
  createProjectModal: boolean
  authModal: boolean
  currentformStep: number
}
interface ProjectsStateInter {
  data: Data
  local: Local
}

/* --- ACTIONS --- */
type projectsActions = ActionType<typeof actions>

/* --- EXPORTS --- */

 
export type createProjectPayload = {
  title: string
  description: string
  tags: []
}

export type ProjectsState = ProjectsStateInter
export type ProjectsActions = projectsActions

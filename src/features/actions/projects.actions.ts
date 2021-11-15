import { action } from 'typesafe-actions'
import ActionTypes from '../constants/projects.constants'
import { createProjectPayload } from '../types/projects.types'

export const createProject = (body: createProjectPayload) =>
  action(ActionTypes.CREATE_PROJECT.request, body)

export const getProjects = (query: string) =>
  action(ActionTypes.GET_PROJECTS.request, query)

export const toggleModal = (value: boolean) =>
  action(ActionTypes.TOGGLE_MODAL, value)

export const genrateUploadToken = (value: string) =>
  action(ActionTypes.GENERATE_UPLOAD_TOKEN.request, value)

export const getUploadTokensList = (query: string, token: string) =>
  action(ActionTypes.GET_UPLOAD_TOKENS_LIST.request, { token, query })

export const addVideoToProject = (id: string, project: object) =>
  action(ActionTypes.ADD_VIDEO_TO_PROJECT, { id, project })

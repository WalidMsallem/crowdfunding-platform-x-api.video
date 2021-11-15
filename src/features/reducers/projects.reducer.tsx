/**
 * Projects reducer
 */
import ActionTypes, { STEPPER_STATE } from '../constants/projects.constants'
import { ProjectsActions, ProjectsState } from '../types/projects.types'
import produce from 'immer'
import {
  encryptAndSave,
  remove as removeToken,
  load as loadStorageItem,
} from '../../utils/storage'
import { notification } from 'antd'
import { handleErrorMessage } from '../../utils/reducer.utils'

// The initial state of the reducer
export const initialState: ProjectsState = {
  data: {
    currentProject: {},
    uploadTokens: {
      data: [],
      pagination: {},
    },
    projects: {
      data: [],
      pagination: {},
    },
    uploadToken: {
      token: loadStorageItem('upload_token'),
      ttl: 0,
      createdAt: '',
      expiresAt: null,
    },
  },
  local: {
    loading: {
      getProjects: false,
      creatingProject: false,
      genrateUploadToken: false,
      getUploadTokens: false,
    },
    errors: {
      getProjects: '',
      creatingProject: '',
      genrateUploadToken: '',
      getUploadTokens: '',
    },
    createProjectModal: false,
    currentformStep: STEPPER_STATE.metaData,
    authModal: false,
  },
}

const projectsReducer = (
  state: ProjectsState = initialState,
  action: ProjectsActions | any,
): ProjectsState =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.ADD_VIDEO_TO_PROJECT:
        const newUploadTokens: [] = state.data.uploadTokens.data.map(
          (el: any) => {
            if (el.videoId === action.payload.id) {
              return action.payload.project
            }
            return { ...el }
          },
        )
        draft.data.uploadTokens.data = newUploadTokens

        break
      case ActionTypes.TOGGLE_MODAL:
        draft.local.createProjectModal = action.payload
        break
      case ActionTypes.CHANGE_STEP:
        draft.local.currentformStep = action.data
        break
      // create projects
      case ActionTypes.CREATE_PROJECT.request:
        draft.local.loading.creatingProject = true
        draft.local.errors.creatingProject = ''
        break
      case ActionTypes.CREATE_PROJECT.success:
        draft.local.loading.creatingProject = false
        draft.local.errors.creatingProject = ''
        draft.data.currentProject = action.data
        draft.data.projects.data.push(action.data)
        break
      case ActionTypes.CREATE_PROJECT.failure:
        draft.local.loading.creatingProject = false
        try {
          draft.local.errors.creatingProject = handleErrorMessage(action)
        } catch (e) {
          draft.local.errors.creatingProject = 'Server error'
        }
        break
      // list all projects
      case ActionTypes.GET_PROJECTS.request:
        draft.local.loading.getProjects = true
        draft.local.errors.getProjects = ''
        break
      case ActionTypes.GET_PROJECTS.success:
        draft.local.loading.getProjects = false
        draft.local.errors.getProjects = ''
        draft.data.projects = action.data
        break
      case ActionTypes.GET_PROJECTS.failure:
        draft.local.loading.getProjects = false
        try {
          draft.local.errors.getProjects = handleErrorMessage(action)
        } catch (e) {
          draft.local.errors.getProjects = 'Server error'
        }
        break

      case ActionTypes.GENERATE_UPLOAD_TOKEN.request:
        draft.local.loading.genrateUploadToken = true
        draft.local.errors.genrateUploadToken = ''
        break
      case ActionTypes.GENERATE_UPLOAD_TOKEN.success:
        draft.local.loading.genrateUploadToken = false
        draft.local.errors.genrateUploadToken = ''
        draft.data.uploadToken = action.data
        encryptAndSave('upload_token', JSON.stringify(action.data.token))
        break
      case ActionTypes.GENERATE_UPLOAD_TOKEN.failure:
        draft.local.loading.genrateUploadToken = false
        removeToken('upload_token')
        draft.local.errors.genrateUploadToken = handleErrorMessage(action)
        notification['error']({
          message: 'Generate token error',
          description: handleErrorMessage(action),
        })
        break
      // upload tokens list
      case ActionTypes.GET_UPLOAD_TOKENS_LIST.request:
        draft.local.loading.getUploadTokens = true
        draft.local.errors.getUploadTokens = ''
        break
      case ActionTypes.GET_UPLOAD_TOKENS_LIST.success:
        draft.local.loading.getUploadTokens = false
        draft.local.errors.getUploadTokens = ''
        draft.data.uploadTokens = action.data
        const validToken = action.data.data.find(
          (el: { ttl: number }) => el.ttl === 0,
        )
        if (validToken) {
          encryptAndSave('upload_token', JSON.stringify(validToken.token))
        }
        break
      case ActionTypes.GET_UPLOAD_TOKENS_LIST.failure:
        draft.local.loading.getUploadTokens = false
        try {
          draft.local.errors.getUploadTokens = handleErrorMessage(action)
        } catch (e) {
          draft.local.errors.getUploadTokens = 'Server error'
        }
        break
    }
  })

export default projectsReducer
